"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiendaController_1 = __importDefault(require("../controles/tiendaController"));
class TiendaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', tiendaController_1.default.listar_tiendas);
        this.router.get('/listarProActivos', tiendaController_1.default.listartiendasActivas);
        this.router.get('/obtener/:id_tienda', tiendaController_1.default.obtenerPorid);
        this.router.post('/Agregar', tiendaController_1.default.agregar_tienda);
        this.router.put('/actualizar/:id_tienda', tiendaController_1.default.actualizar_datos_tienda);
        this.router.put('/eliminar/:id_tienda', tiendaController_1.default.desactivar_tienda);
        this.router.put('/activar/:id_tienda', tiendaController_1.default.activar_teinda);
        this.router.post('/obtenertienda/:cedula', tiendaController_1.default.obtenerPorcedula);
    }
}
const tienda = new TiendaRoutes();
exports.default = tienda.router;
