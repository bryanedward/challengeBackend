import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getDrive = async (id: any = 1) => {
  if (id > 1) {
    const [count, data] = await prisma.$transaction([
      prisma.vehicle.count(),
      prisma.vehicle.findMany({
        take: 40,
        include: {
          driver: true,
        },
        cursor: {
          id: Number(id) * 40,
        },
      }),
    ]);
    return {
      count,
      data,
    };
  }
  const [count, data] = await prisma.$transaction([
    prisma.vehicle.count(),
    prisma.vehicle.findMany({
      take: 40,
      include: {
        driver: true,
      },
    }),
  ]);

  return {
    count,
    data,
  };
};

export const createVehicle = async (req: Request, res: Response) => {
  // create
  const { driver_id, plate, model, type, capacity } = req.body;
  try {
    const dateVehicle = await prisma.vehicle.create({
      data: {
        driver_id,
        plate,
        model,
        type,
        capacity,
        creation_date: new Date(),
      },
    });
    res.status(200).send(dateVehicle);
  } catch (error) {
    res.status(400).json({ message: "error with the create " });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { driver_id, plate, model, type, capacity } = req.body;
  try {
    const updateUser = await prisma.vehicle.update({
      where: {
        id: driver_id,
      },
      data: {
        plate,
        model,
        type,
        capacity,
      },
    });
    res.status(200).send(updateUser);
  } catch (error) {
    throw new Error("erro update");
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await prisma.vehicle.delete({
      where: {
        id: Number(req.query.id),
      },
    });
    res.status(200).json({ message: "delete item" });
  } catch (error) {
    throw new Error("error delete");
  }
};
