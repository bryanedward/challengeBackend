"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const driver_1 = require("../controllers/driver");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.post("/", [(0, express_validator_1.check)("email").not().isEmpty(), validator_1.handleLanguageHeader], driver_1.login);
exports.default = router;
