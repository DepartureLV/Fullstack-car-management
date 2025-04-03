import { Request, Response } from "express";
import { CarsModel } from "./cars.model";

export const CarsController = {
  getAllCars: async (_req: Request, res: Response) => {
    try {
      const cars = await CarsModel.findAll();
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve cars" });
    }
  },

  upsertCar: async (req: Request, res: Response) => {
    try {
      const { id, carRegistrationNum, carModel, carBrand, notes } = req.body;
      const car = await CarsModel.upsert(
        id,
        carRegistrationNum,
        carModel,
        carBrand,
        notes
      );
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: "Failed to upsert car" });
    }
  },

  deleteCar: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCar = await CarsModel.delete(id);
      res.status(200).json({ data: deletedCar, err: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: {}, err: true });
    }
  },
};
