"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriasController_1 = __importDefault(require("../controles/CategoriasController"));
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', CategoriasController_1.default.listar_categoria);
        this.router.get('/obtener/:id_categoria', CategoriasController_1.default.obtenerPorid);
        this.router.post('/Agregar', CategoriasController_1.default.agregar_categoria);
        this.router.put('/actualizar/:id_categoria', CategoriasController_1.default.actualizar);
    }
}
const categoria = new CategoriaRoutes();
exports.default = categoria.router;
