"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cantonesController_1 = __importDefault(require("../controles/cantonesController"));
class CantonesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', cantonesController_1.default.listar_cantones);
        this.router.get('/obtener/:id_cantones', cantonesController_1.default.obtenerPorid);
    }
}
const canton = new CantonesRoutes();
exports.default = canton.router;
