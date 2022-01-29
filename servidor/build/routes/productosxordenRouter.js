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
        this.router.post('/obtener/:id_producto_orden', productosxordenController_1.default.obtenerPorid);
        this.router.post('/obtenerPorIdOrden/:id_orden_compra', productosxordenController_1.default.obtenerPorIdOrdenCompra);
        this.router.post('/obtenerPorIdOrdenDTO/:id_orden_compra', productosxordenController_1.default.obtenerPorIdOrdenCompraDTO);
        this.router.post('/agregar', productosxordenController_1.default.agregar_pro_orden);
        this.router.put('/actualizar/:id_producto_orden', productosxordenController_1.default.actualizar_pro_orden);
        this.router.delete('/eliminar/:id_producto_orden', productosxordenController_1.default.eliminar);
    }
}
const productosxorden = new ProductosporordenRoutes();
exports.default = productosxorden.router;
