"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_pedidoController_1 = __importDefault(require("../controles/estado_pedidoController"));
class EstadopedRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', estado_pedidoController_1.default.listar_estados_pedi);
        this.router.get('/obtener/:id_estado_pedido', estado_pedidoController_1.default.obtenerPorid);
    }
}
const estado_ped = new EstadopedRoutes();
exports.default = estado_ped.router;
