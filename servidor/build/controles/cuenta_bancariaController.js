"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_datos_1 = __importDefault(require("../base_datos"));
class CuentabancoController {
    listar_cuentabanco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_cuentas = yield base_datos_1.default.query('SELECT * FROM datos_cuentas_bancaria');
            res.send(lista_cuentas);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.params.id_cuenta_banco;
            const cuen = yield base_datos_1.default.query(`SELECT * FROM datos_cuentas_bancaria where id_cuenta_banco ='${cuenta}'`);
            res.send(cuen);
        });
    }
    obtenerPoridmetodopago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.params.id_metodo_pago_tienda;
            const cuen = yield base_datos_1.default.query(`SELECT dato.tipo_cuenta, dato.numero_cuenta,dato.titular_cuenta, dato.cedula_titular, dato.activacion, bn.descripcion FROM datos_cuentas_bancaria as dato INNER JOIN bancos as bn on dato.id_banco = bn.id_banco where dato.activacion=1 and id_metodo_pago_tienda ='${cuenta}'`);
            res.send(cuen);
        });
    }
    obtenerPoridmetodopagotodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.params.id_metodo_pago_tienda;
            const cuen = yield base_datos_1.default.query(`SELECT dato.tipo_cuenta, dato.numero_cuenta,dato.titular_cuenta, dato.cedula_titular, dato.activacion, bn.descripcion, dato.id_cuenta_banco FROM datos_cuentas_bancaria as dato INNER JOIN bancos as bn on dato.id_banco = bn.id_banco where id_metodo_pago_tienda ='${cuenta}'`);
            res.send(cuen);
        });
    }
    agregar_cuenta_banco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_cuenta = yield base_datos_1.default.query('INSERT INTO datos_cuentas_bancaria set  ? ', [req.body]);
            res.json({ message: 'cuenta bancaria agregada ' });
        });
    }
    actualizarestado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("este es el activa" + req.body.activacion);
            const agrega_producto = yield base_datos_1.default.query("UPDATE datos_cuentas_bancaria SET activacion = ? WHERE id_cuenta_banco = ?", [req.body.activacion, req.params.id_cuenta_banco]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
}
const cuentabancoController = new CuentabancoController;
exports.default = cuentabancoController;
