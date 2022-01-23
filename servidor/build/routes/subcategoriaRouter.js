"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoriaController_1 = __importDefault(require("../controles/subcategoriaController"));
class SubCategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', subcategoriaController_1.default.listar_subcategoria);
        this.router.get('/obtener/:id_sub_categoria', subcategoriaController_1.default.obtenerPorid);
        this.router.post('/Agregar', subcategoriaController_1.default.agregar_subcategoria);
        this.router.put('/actualizar/:id_sub_categoria', subcategoriaController_1.default.actualizar);
        this.router.post('/obtenerporcat/:id_categoria', subcategoriaController_1.default.obtenerPoridcat);
    }
}
const subcategoria = new SubCategoriaRoutes();
exports.default = subcategoria.router;
