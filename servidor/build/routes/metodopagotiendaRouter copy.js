"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodopagotiendaController_1 = __importDefault(require("../controles/metodopagotiendaController"));
class MetpagoTiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', metodopagotiendaController_1.default.listar_meto_tienda);
        this.router.get('/obtener/:id_metodo_pago_tienda', metodopagotiendaController_1.default.obtenerPorid);
        this.router.post('/Agregar', metodopagotiendaController_1.default.agregar_meto_tienda);
    }
}
const metodo_pag_tienda = new MetpagoTiRoutes();
exports.default = metodo_pag_tienda.router;
