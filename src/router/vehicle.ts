import { Router, Request, Response } from "express";
import { check } from "express-validator";
import {
  createVehicle,
  deleteVehicle,
  filterVehicle,
  getDrive,
  updateVehicle,
} from "../controllers/vehicle";
import { handleLanguageHeader } from "../middleware/validator";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const results = await getDrive(req.query.start);
  res.status(200).json(results);
});

router.get("/find", async (req: Request, res: Response) => {
  filterVehicle(Number(req.query.driver_id), Number(req.query.limit)).then(
    (data) => {
      res.status(200).json(data);
    }
  );
});

router.post(
  "/",
  [
    check("plate").not().isEmpty(),
    check("model").not().isEmpty(),
    check("type").not().isEmpty(),
    check("capacity").not().isEmpty(),
    handleLanguageHeader,
  ],
  async (req: Request, res: Response) => {
    createVehicle(req.body).then((data) => {
      res.status(200).send(data);
    });
  }
);

router.post(
  "/update",
  [
    check("plate").not().isEmpty(),
    check("model").not().isEmpty(),
    check("type").not().isEmpty(),
    check("capacity").not().isEmpty(),
    handleLanguageHeader,
  ],
  async (req: Request, res: Response) => {
    updateVehicle(req.body).then((data) => {
      res.status(200).send(data);
    });
  }
);

router.delete("/", deleteVehicle);

export default router;
