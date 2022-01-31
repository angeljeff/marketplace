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
    obtenerPorUsuarioCedulaDTO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = req.params.cedula;
            const ord = yield base_datos_1.default.query(`SELECT orden.id_orden_compra , orden.total, orden.direccion, orden.celular, orden.nombres, orden.cedula_envio, orden.id_estado_pedido, orden.id_metodo_pago_tienda, orden.cedula, estado.nombre_estado, pago.descripcion, ti.nombre_ti FROM orden_compra as orden INNER JOIN metodo_pago_tienda as met on orden.id_metodo_pago_tienda = met.id_metodo_pago_tienda INNER JOIN metodo_pago as pago on met.id_metodo_pago = pago.id_metodo_pago INNER JOIN estado_pedido as estado on orden.id_estado_pedido = estado.id_estado_pedido INNER JOIN tiendas as ti ON met.id_tienda = ti.id_tienda where orden.cedula ='${cedula}'`);
            res.send(ord);
        });
    }
    obtenerOrdenesPorTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idTienda = req.params.id_tienda;
            const ord = yield base_datos_1.default.query(`SELECT orden.id_orden_compra , orden.total, orden.direccion, orden.celular, orden.nombres, orden.cedula_envio, orden.id_estado_pedido, orden.id_metodo_pago_tienda, orden.cedula, estado.nombre_estado, pago.descripcion, ti.nombre_ti FROM orden_compra as orden INNER JOIN metodo_pago_tienda as met on orden.id_metodo_pago_tienda = met.id_metodo_pago_tienda INNER JOIN metodo_pago as pago on met.id_metodo_pago = pago.id_metodo_pago INNER JOIN estado_pedido as estado on orden.id_estado_pedido = estado.id_estado_pedido INNER JOIN tiendas as ti ON met.id_tienda = ti.id_tienda where met.id_tienda = '${idTienda}'`);
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
    actualizar_estado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_pro = yield base_datos_1.default.query("UPDATE orden_compra SET  id_estado_pedido = ? WHERE id_orden_compra = ?", [req.body.id_estado_pedido, req.params.id_orden_compra]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
}
const ordencompraController = new OrdencompraController;
exports.default = ordencompraController;
