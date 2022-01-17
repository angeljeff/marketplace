"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controlador_1 = __importDefault(require("../controles/usuario_controlador"));
class ControlUsuario {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', usuario_controlador_1.default.listar);
        this.router.get('/listarActivos', usuario_controlador_1.default.listarUsuariosActivos);
        this.router.get('/obtener/:cedula', usuario_controlador_1.default.obtenerPorCedula);
        this.router.post('/create', usuario_controlador_1.default.crear);
        this.router.put('/update/:cedula', usuario_controlador_1.default.actualizar);
        this.router.put('/eliminar/:cedula', usuario_controlador_1.default.eliminar);
    }
}
const cont_usu = new ControlUsuario();
exports.default = cont_usu.router;
