"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodo_pagoController_1 = __importDefault(require("../controles/metodo_pagoController"));
class MetodopagRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', metodo_pagoController_1.default.listar_metodos_pago);
        this.router.get('/obtener/:id_metodo_pago', metodo_pagoController_1.default.obtenerPorid);
    }
}
const metodopago = new MetodopagRoutes();
exports.default = metodopago.router;
