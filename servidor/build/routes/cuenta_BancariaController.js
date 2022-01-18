"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BancoController_1 = __importDefault(require("../controles/BancoController"));
class BancoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', BancoController_1.default.listar_bancos);
        this.router.get('/obtener/:id_banco', BancoController_1.default.obtenerPorid);
    }
}
const banco = new BancoRoutes();
exports.default = banco.router;
