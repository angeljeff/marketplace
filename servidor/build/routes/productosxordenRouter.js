"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosxordenController_1 = __importDefault(require("../controles/productosxordenController"));
class ProductosporordenRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', productosxordenController_1.default.listar_pro_orden);
        this.router.get('/obtener/:id_producto_orden', productosxordenController_1.default.obtenerPorid);
        this.router.post('/Agregar', productosxordenController_1.default.agregar_pro_orden);
    }
}
const productosxorden = new ProductosporordenRoutes();
exports.default = productosxorden.router;
