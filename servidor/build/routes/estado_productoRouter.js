"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_productoController_1 = __importDefault(require("../controles/estado_productoController"));
class EstadoproRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', estado_productoController_1.default.listar_estados);
        this.router.get('/obtener/:id_estado_pro', estado_productoController_1.default.obtenerPorid);
    }
}
const estado_pro = new EstadoproRoutes();
exports.default = estado_pro.router;
