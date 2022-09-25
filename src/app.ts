import express from "express";
import dotenv from "dotenv";
import vehicle from "./router/vehicle";
import drive from "./router/driver";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../bryanedwardswagger.json";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/vehicle", vehicle);
app.use("/driver", drive);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
