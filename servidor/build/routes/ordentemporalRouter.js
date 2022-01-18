"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordentemporalController_1 = __importDefault(require("../controles/ordentemporalController"));
class OrdentemporalRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', ordentemporalController_1.default.listar_orden_temporal);
        this.router.get('/obtener/:id_orden_temporal', ordentemporalController_1.default.obtenerPorid);
        this.router.post('/Agregar', ordentemporalController_1.default.agregar_orden_temporal);
    }
}
const orden_temporal = new OrdentemporalRoutes();
exports.default = orden_temporal.router;
