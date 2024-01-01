import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
const JWT_SECRET = "cars-bugatty";

let saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ error: "L'email ou le mot de passe sont non valides" });
    }

    bcrypt.compare(password, user.dataValues.password, (err, result) => {
      if (err) {
        return res.status(401).json({ error: "Error" + err });
      } else if (result) {
        const token = jwt.sign({ id: user.dataValues.id }, JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.json({ token: token, user: user.dataValues });
      } else {
        return res
          .status(401)
          .json({ error: "L'email ou le mot de passe sont non valides" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (userData) => {
  try {
    userData.password = bcrypt.hashSync(userData.password, salt);
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({ include: [{ model: Car, as: "cars" }] });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Car, as: "cars" }],
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (updatedData.newPass !== "") {
        updatedData.password = bcrypt.hashSync(updatedData.newPass, salt);
      }
      await user.update(updatedData);
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
