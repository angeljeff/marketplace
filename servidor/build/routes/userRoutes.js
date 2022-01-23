"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controles/usuarioController"));
class ControlUsuario {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', usuarioController_1.default.listar);
        this.router.get('/listarActivos', usuarioController_1.default.listarUsuariosActivos);
        this.router.post('/obtener/:cedula', usuarioController_1.default.obtenerPorCedula);
        this.router.post('/create', usuarioController_1.default.crear);
        this.router.post('/login', usuarioController_1.default.login);
        this.router.put('/update/:cedula', usuarioController_1.default.actualizar);
        this.router.put('/eliminar/:cedula', usuarioController_1.default.eliminar);
    }
}
const usuario = new ControlUsuario();
exports.default = usuario.router;
