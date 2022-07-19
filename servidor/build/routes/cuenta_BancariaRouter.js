"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuenta_bancariaController_1 = __importDefault(require("../controles/cuenta_bancariaController"));
class CuentaBanRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listar', cuenta_bancariaController_1.default.listar_cuentabanco);
        this.router.post('/obtener/:id_cuenta_banco', cuenta_bancariaController_1.default.obtenerPorid);
        this.router.post('/Agregarcuentabanco', cuenta_bancariaController_1.default.agregar_cuenta_banco);
        this.router.post('/obtenermetodos/:id_metodo_pago_tienda', cuenta_bancariaController_1.default.obtenerPoridmetodopago);
        this.router.put('/activar/:id_cuenta_banco', cuenta_bancariaController_1.default.actualizarestado);
        this.router.post('/obtenerdatospago/:id_metodo_pago_tienda', cuenta_bancariaController_1.default.obtenerPoridmetodopagotodos);
    }
}
const cuenta_banco = new CuentaBanRoutes();
exports.default = cuenta_banco.router;
