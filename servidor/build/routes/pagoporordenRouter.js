"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PagoxordenController_1 = __importDefault(require("../controles/PagoxordenController"));
class PagoporordenlRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', PagoxordenController_1.default.listar_pago_orden);
        this.router.get('/obtener/:id_pago_por_orden', PagoxordenController_1.default.obtenerPorid);
        this.router.post('/agregar', PagoxordenController_1.default.agregar_pago_orden);
    }
}
const pago_orden = new PagoporordenlRoutes();
exports.default = pago_orden.router;
