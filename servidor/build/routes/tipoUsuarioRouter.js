"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoUsuarioController_1 = __importDefault(require("../controles/tipoUsuarioController"));
class TipousuRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', tipoUsuarioController_1.default.listar_tipos_usuarios);
        this.router.get('/obtener/:id_tipo_usuario', tipoUsuarioController_1.default.obtenerPorid);
    }
}
const tipo_usuario = new TipousuRoutes();
exports.default = tipo_usuario.router;
