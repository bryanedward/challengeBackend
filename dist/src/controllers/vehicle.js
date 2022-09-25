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
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getDrive = void 0;
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
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create
    const { driver_id, plate, model, type, capacity } = req.body;
    try {
        const dateVehicle = yield prisma.vehicle.create({
            data: {
                driver_id,
                plate,
                model,
                type,
                capacity,
                creation_date: new Date(),
            },
        });
        res.status(200).send(dateVehicle);
    }
    catch (error) {
        res.status(400).json({ message: "error with the create " });
    }
});
exports.createVehicle = createVehicle;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driver_id, plate, model, type, capacity } = req.body;
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
        res.status(200).send(updateUser);
    }
    catch (error) {
        throw new Error("erro update");
    }
});
exports.updateVehicle = updateVehicle;
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
        throw new Error("error delete");
    }
});
exports.deleteVehicle = deleteVehicle;
