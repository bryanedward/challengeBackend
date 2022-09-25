import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/driver";
import { handleLanguageHeader } from "../middleware/validator";

const router = Router();
router.post("/", [check("email").not().isEmpty(), handleLanguageHeader], login);

export default router;
