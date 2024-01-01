import express from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
  getCarByOwnerId,
} from "../controllers/CarsController.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/cars/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage: storage }); // Use default settings

const carRouter = express.Router();
carRouter.post("/cars", upload.array("photos", 5), createCar);
carRouter.get("/cars", getAllCars);
carRouter.get("/cars/:id", getCarById);
carRouter.get("/cars/owner/:id", getCarByOwnerId);
carRouter.put("/cars/:id", upload.array("photos", 5), updateCarById);
carRouter.delete("/cars/:id", deleteCarById);

export default carRouter;
