"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const vehicle_1 = require("../controllers/vehicle");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, vehicle_1.getDrive)(req.query.id);
    res.status(200).json(results);
}));
router.post("/", [
    (0, express_validator_1.check)("plate").not().isEmpty(),
    (0, express_validator_1.check)("model").not().isEmpty(),
    (0, express_validator_1.check)("type").not().isEmpty(),
    (0, express_validator_1.check)("capacity").not().isEmpty(),
    validator_1.handleLanguageHeader,
], vehicle_1.createVehicle);
router.post("/update", [
    (0, express_validator_1.check)("plate").not().isEmpty(),
    (0, express_validator_1.check)("model").not().isEmpty(),
    (0, express_validator_1.check)("type").not().isEmpty(),
    (0, express_validator_1.check)("capacity").not().isEmpty(),
    validator_1.handleLanguageHeader,
], vehicle_1.updateVehicle);
router.delete("/", vehicle_1.deleteVehicle);
exports.default = router;
