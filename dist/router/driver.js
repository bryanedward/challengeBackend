'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const driver_1 = __importDefault(require('../controllers/driver'))
const router = (0, express_1.Router)()
router.get('/', (_req, res) => {
  res.send(driver_1.default.getDrive)
})
exports.default = router
