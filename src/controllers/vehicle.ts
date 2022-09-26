import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ModelVehicle } from "../models/Vehicle";
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

export const createVehicle = async ({
  driver_id,
  plate,
  model,
  type,
  capacity,
}: ModelVehicle) => {
  // create
  try {
    const dataVehicle = await prisma.vehicle.create({
      data: {
        driver_id,
        plate,
        model,
        type,
        capacity,
        creation_date: new Date(),
      },
    });
    return dataVehicle;
  } catch (error) {
    return error;
  }
};

export const updateVehicle = async ({
  driver_id,
  plate,
  model,
  type,
  capacity,
}: ModelVehicle) => {
  // update vehicle
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
    return updateUser;
  } catch (error) {
    return error;
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
    res.status(400).json({
      message: "error",
    });
  }
};
