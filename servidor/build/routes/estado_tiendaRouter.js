"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_tiendaController_1 = __importDefault(require("../controles/estado_tiendaController"));
class EstadotiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', estado_tiendaController_1.default.listar_estados_tienda);
        this.router.get('/obtener/:id_estado_tienda', estado_tiendaController_1.default.obtenerPorid);
    }
}
const estado_ti = new EstadotiRoutes();
exports.default = estado_ti.router;
