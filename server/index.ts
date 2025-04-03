import express, { Request } from "express";
import { PrismaClient } from "./generated/prisma";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Get all cars
app.get("/cars", async (_req, res) => {
  const carCount = await prisma.car.findMany();
  res.status(200).send(carCount);
});

// Upsert car
app.post("/cars", async (req, res) => {
  const {
    id,
    carRegistrationNum,
    carModel,
    carBrand,
    notes,
  }: {
    id?: string;
    carRegistrationNum: string;
    carModel: string;
    carBrand: string;
    notes: string;
  } = req.body;

  try {
    const cid = id ? id : uuidv4();
    const createCar = await prisma.car.upsert({
      where: {
        id: cid,
      },
      update: {
        carRegistrationNum,
        carModel,
        carBrand,
        notes,
      },
      create: {
        id: cid,
        carRegistrationNum,
        carBrand,
        carModel,
        notes,
      },
    });
    res.status(200).send({ data: createCar, err: false });
  } catch (err) {
    console.error(err);
    res.status(500).send({ data: {}, err: true });
  }
});

// Delete car by id
app.delete("/cars/:id", async (req: Request<{ id: string }>, res) => {
  const id = req.params.id;

  try {
    const deleteCar = await prisma.car.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send({ data: deleteCar, err: false });
  } catch (err) {
    console.error(err);
    res.status(500).send({ data: {}, err: true });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
