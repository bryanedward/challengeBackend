"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLanguageHeader = void 0;
const express_validator_1 = require("express-validator");
function handleLanguageHeader(req, res, next) {
    const err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        res.status(404).json({
            ok: false,
            errors: err.mapped(),
        });
    }
    next();
}
exports.handleLanguageHeader = handleLanguageHeader;
