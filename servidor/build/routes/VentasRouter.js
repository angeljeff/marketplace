"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentasController_1 = __importDefault(require("../controles/VentasController"));
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', VentasController_1.default.listar_ventas);
        this.router.get('/obtener/:id_venta', VentasController_1.default.obtenerPorid);
        this.router.post('/Agregar', VentasController_1.default.agregar_ventas);
        this.router.post('/prediccion/:fecha', VentasController_1.default.consultar_ventas_prediccion);
    }
}
const ventas = new VentasRoutes();
exports.default = ventas.router;
