import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  // login
  try {
    const user = await prisma.driver.findUnique({
      where: {
        email: req.body.email,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({
      message: "email incorrect",
    });
  }
};
