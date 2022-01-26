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
class MetodopagoTiendaController {
    listar_meto_tienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_meto = yield base_datos_1.default.query('SELECT * FROM metodo_pago_tienda');
            res.send(lista_meto);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const acualiza = yield base_datos_1.default.query("UPDATE metodo_pago_tienda SET  estado_metodo = ? WHERE id_metodo_pago_tienda = ?", [req.body.estado_metodo, req.params.id_metodo_pago_tienda]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const metodo = req.params.id_cuenta_banco;
            const mpt = yield base_datos_1.default.query(`SELECT * FROM metodo_pago_tienda where id_metodo_pago_tienda ='${metodo}'`);
            res.send(mpt);
        });
    }
    obtenerPoridtienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const metodo2 = req.params.id_tienda;
            const mpt = yield base_datos_1.default.query(`SELECT * FROM metodo_pago_tienda where id_tienda ='${metodo2}'`);
            res.send(mpt);
        });
    }
    agregar_meto_tienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_metodo_tienda = yield base_datos_1.default.query('INSERT INTO metodo_pago_tienda set  ? ', [req.body]);
            res.json({ message: 'metodo de pago agregado agregada ' });
        });
    }
}
const metodopagtiendaController = new MetodopagoTiendaController;
exports.default = metodopagtiendaController;
