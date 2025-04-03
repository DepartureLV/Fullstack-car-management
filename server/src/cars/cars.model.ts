import { PrismaClient } from "../../generated/prisma";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const CarsModel = {
  findAll: async () => {
    return await prisma.car.findMany();
  },
  upsert: async (
    id: string,
    carRegistrationNum: string,
    carModel: string,
    carBrand: string,
    notes: string
  ) => {
    const cid = id ? id : uuidv4();
    return await prisma.car.upsert({
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
  },
  delete: async (id: string) => {
    return await prisma.car.delete({
      where: {
        id: id,
      },
    });
  },
};
