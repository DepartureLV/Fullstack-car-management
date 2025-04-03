import express from "express";
import { CarsController } from "./cars.controller";

const router = express.Router();

router.get("/", CarsController.getAllCars);
router.post("/", CarsController.upsertCar);
router.delete("/:id", CarsController.deleteCar);

export default router;
