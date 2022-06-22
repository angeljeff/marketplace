"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CorreoController_1 = __importDefault(require("../controles/CorreoController"));
class CorreoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/enviarcorreocontra', CorreoController_1.default.enviarcorreocontrasenia);
        this.router.post('/enviarcorreoaprueba', CorreoController_1.default.enviarcorreoaprobaproducto);
        this.router.post('/enviarcorreoapruebapedido', CorreoController_1.default.enviarcorreoaprobapedido);
    }
}
const correo = new CorreoRoutes();
exports.default = correo.router;
