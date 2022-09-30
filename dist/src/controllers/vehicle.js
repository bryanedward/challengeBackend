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
exports.deleteVehicle = exports.filterVehicle = exports.updateVehicle = exports.createVehicle = exports.getDrive = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDrive = (id = 1) => __awaiter(void 0, void 0, void 0, function* () {
    if (id > 1) {
        const [count, data] = yield prisma.$transaction([
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
    const [count, data] = yield prisma.$transaction([
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
});
exports.getDrive = getDrive;
const createVehicle = ({ driver_id, plate, model, type, capacity, }) => __awaiter(void 0, void 0, void 0, function* () {
    // create
    try {
        const dataVehicle = yield prisma.vehicle.create({
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
    }
    catch (error) {
        return error;
    }
});
exports.createVehicle = createVehicle;
const updateVehicle = ({ driver_id, plate, model, type, capacity, }) => __awaiter(void 0, void 0, void 0, function* () {
    // update vehicle
    try {
        const updateUser = yield prisma.vehicle.update({
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
    }
    catch (error) {
        return error;
    }
});
exports.updateVehicle = updateVehicle;
const filterVehicle = (_driver_id, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // get the vehicles by id user
    try {
        const getVehicle = prisma.vehicle.findMany({
            take: Number(limit),
            skip: 1,
            // where: {
            //   driver_id: Number(driver_id),
            // },
        });
        return getVehicle;
    }
    catch (error) {
        throw error;
    }
});
exports.filterVehicle = filterVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.vehicle.delete({
            where: {
                id: Number(req.query.id),
            },
        });
        res.status(200).json({ message: "delete item" });
    }
    catch (error) {
        res.status(400).json({
            message: "error",
        });
    }
});
exports.deleteVehicle = deleteVehicle;
