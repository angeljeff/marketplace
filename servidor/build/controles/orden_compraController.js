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
class OrdencompraController {
    listar_orden_compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_orden = yield base_datos_1.default.query('SELECT * FROM orden_compra');
            res.send(lista_orden);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orden = req.params.id_orden_compra;
            const ord = yield base_datos_1.default.query(`SELECT * FROM orden_compra where id_orden_compra ='${orden}'`);
            res.send(ord);
        });
    }
    obtenerPorUsuarioCedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = req.params.cedula;
            const ord = yield base_datos_1.default.query(`SELECT * FROM orden_compra where id_estado_pedido = 1 AND cedula ='${cedula}'`);
            res.send(ord);
        });
    }
    agregar_orden_compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevaOrden = yield base_datos_1.default.query('INSERT INTO orden_compra set  ? ', [req.body]);
            res.send(nuevaOrden);
        });
    }
    actualizar_orden_compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_pro = yield base_datos_1.default.query("UPDATE orden_compra SET  total = ?, direccion= ?, celular= ?, nombres= ?, cedula_envio= ?, id_metodo_pago_tienda = ?, id_estado_pedido = ? WHERE id_orden_compra = ?", [req.body.total, req.body.direccion, req.body.celular, req.body.nombres, req.body.cedula_envio, req.body.id_metodo_pago_tienda, req.body.id_estado_pedido, req.params.id_orden_compra]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
}
const ordencompraController = new OrdencompraController;
exports.default = ordencompraController;
