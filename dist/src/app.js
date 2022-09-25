"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const vehicle_1 = __importDefault(require("./router/vehicle"));
const driver_1 = __importDefault(require("./router/driver"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bryanedwardswagger_json_1 = __importDefault(require("../bryanedwardswagger.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/vehicle", vehicle_1.default);
app.use("/driver", driver_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(bryanedwardswagger_json_1.default));
exports.default = app;
