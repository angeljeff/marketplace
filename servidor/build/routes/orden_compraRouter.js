"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orden_compraController_1 = __importDefault(require("../controles/orden_compraController"));
class OrdenCompraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', orden_compraController_1.default.listar_orden_compra);
        this.router.get('/ordencompraEst', orden_compraController_1.default.listarordenesparaestadistica);
        this.router.post('/obtener/:id_orden_compra', orden_compraController_1.default.obtenerPorid);
        this.router.post('/obtenerOrdenesPorTienda/:id_tienda', orden_compraController_1.default.obtenerOrdenesPorTienda);
        this.router.post('/traerOrdenUsuario/:cedula', orden_compraController_1.default.obtenerPorUsuarioCedula);
        this.router.post('/traerOrdenUsuarioDTO/:cedula', orden_compraController_1.default.obtenerPorUsuarioCedulaDTO);
        this.router.post('/agregar', orden_compraController_1.default.agregar_orden_compra);
        this.router.put('/actualizar/:id_orden_compra', orden_compraController_1.default.actualizar_orden_compra);
        this.router.put('/actualizarEstado/:id_orden_compra', orden_compraController_1.default.actualizar_estado);
        this.router.put('/actualizarEstadoComprobante/:id_orden_compra', orden_compraController_1.default.actualizar_estado_porsubidadecomprobante);
    }
}
const orden_compra = new OrdenCompraRoutes();
exports.default = orden_compra.router;
