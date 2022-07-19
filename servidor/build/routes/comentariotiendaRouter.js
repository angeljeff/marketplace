"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentarioTiendaController_1 = __importDefault(require("../controles/comentarioTiendaController"));
class ComentarioTiendaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', comentarioTiendaController_1.default.listar_comentarios);
        /*         this.router.get('/listarProActivos', tiendaController.listartiendasActivas);
                this.router.post('/obtener/:id_tienda', tiendaController.obtenerPorid); */
        this.router.post('/Agregar', comentarioTiendaController_1.default.agregar_comentario);
        this.router.post('/obtener/:id_tienda', comentarioTiendaController_1.default.obtenerPorTienda);
        /*         this.router.put('/actualizar/:id_tienda', tiendaController.actualizar_datos_tienda);
                this.router.put('/eliminar/:id_tienda', tiendaController.desactivar_tienda);
                this.router.put('/activar/:id_tienda', tiendaController.activar_teinda);
                this.router.put('/contador/:id_tienda', tiendaController.actualizar_contador);
                this.router.post('/obtenertienda/:cedula', tiendaController.obtenerPorcedula); */
    }
}
const comentario_tienda = new ComentarioTiendaRoutes();
exports.default = comentario_tienda.router;
