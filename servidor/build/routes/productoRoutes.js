"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = __importDefault(require("../controles/productoController"));
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', productoController_1.default.listar);
        this.router.get('/listarprocompletoadmin', productoController_1.default.listarprocompletoadmi);
        this.router.get('/listarProActivos', productoController_1.default.listarProductosActivos);
        this.router.get('/listarProcompletos', productoController_1.default.listarprocompleto);
        this.router.post('/listarporsub/:id_sub_categoria', productoController_1.default.listarporsubcategorias);
        this.router.post('/obtener/:id_producto', productoController_1.default.obtenerPorid);
        this.router.post('/obtenerprocomporid/:id_producto', productoController_1.default.listarprocompletoporid);
        this.router.post('/obtenerpro/:id_tienda', productoController_1.default.obtenerPoridtienda);
        this.router.post('/Agregar', productoController_1.default.agregar);
        this.router.put('/actualizar/:id_producto', productoController_1.default.actualizar);
        this.router.put('/actualizarEstado/:id_producto', productoController_1.default.actualizar_estado);
        this.router.put('/eliminar/:id_producto', productoController_1.default.eliminarproducto);
        this.router.put('/rechazar/:id_producto', productoController_1.default.desactivar);
        this.router.put('/contador/:id_producto', productoController_1.default.actualizar_contador);
        this.router.put('/updateStock/:id_producto', productoController_1.default.actualizar_stock);
        this.router.post('/obtenerporidsub/:id_sub_categoria', productoController_1.default.obtenerPoridsubcategoria);
    }
}
const producto = new ProductoRoutes();
exports.default = producto.router;
