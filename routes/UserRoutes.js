import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
userRouter.post("/users/login", loginUser);
userRouter.put("/users/:id/update", async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
userRouter.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const users = await deleteUser(req.params.id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default userRouter;
