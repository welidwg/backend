import User from "../models/User.js";
import Car from "../models/Car.js";
import { Op } from "sequelize";

export const createCar = async (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    req.body.price = parseFloat(req.body.price);
    req.body.kms = parseFloat(req.body.kms);
    req.body.owner_id = parseInt(req.body.owner_id);
    const data = req.body;
    data.photos = filenames;
    const newCar = await Car.create(data);
    res.json(newCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllCars = async (req, res) => {
  const { brand, model, boite, kms, energie } = req.query;
  const filter = {};
  try {
    if (brand) {
      filter.brand = { [Op.like]: `%${brand}%` };
    }
    if (model) {
      filter.model = { [Op.like]: `%${model}%` };
    }
    if (boite) {
      filter.boite = { [Op.like]: `%${boite}%` };
    }
    if (energie) {
      filter.energie = { [Op.like]: `%${energie}%` };
    }
    if (kms) {
      filter.kms = parseInt(kms);
    }

    const cars = await Car.findAll({
      include: [{ model: User, as: "owner" }],
      where: filter,
    });
    console.log("====================================");
    console.log(req.query);
    console.log("====================================");
    res.json(cars);
  } catch (error) {
    console.error("Error getting cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCarById = async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findByPk(carId, {
      include: [{ model: User, as: "owner" }],
    });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    console.error("Error getting car by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getCarByOwnerId = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const car = await Car.findAll({
      where: { owner_id: ownerId },
      include: [{ model: User, as: "owner" }],
    });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    console.error("Error getting car by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCarById = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findByPk(carId);
    if (car) {
      await car.update(req.body);
      return res.status(201).json({ success: "Voiture bien modifiée" });
    } else {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }
  } catch (error) {
    console.error("Error updating user:\n", error);
    return res.status(500).json({ error: error });
  }
};

export const deleteCarById = async (req, res) => {
  const carId = req.params.id;

  try {
    const deletedRowCount = await Car.destroy({
      where: { id: carId },
    });

    if (deletedRowCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    console.error("Error deleting car by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
