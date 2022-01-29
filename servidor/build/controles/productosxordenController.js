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
class ProductosxordenController {
    listar_pro_orden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_pro = yield base_datos_1.default.query('SELECT * FROM productos_por_orden');
            res.send(lista_pro);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pxo = req.params.id_producto_orden;
            const pro = yield base_datos_1.default.query(`SELECT * FROM productos_por_orden where id_producto_orden ='${pxo}'`);
            res.send(pro);
        });
    }
    obtenerPorIdOrdenCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pxo = req.params.id_orden_compra;
            const pro = yield base_datos_1.default.query(`SELECT * FROM productos_por_orden where id_orden_compra ='${pxo}'`);
            res.send(pro);
        });
    }
    obtenerPorIdOrdenCompraDTO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pxo = req.params.id_orden_compra;
            const pro = yield base_datos_1.default.query(`SELECT pro.id_producto_orden, pro.id_orden_compra, pro.id_producto, pro.cantidad, pro.precio_producto, pro.total_producto , products.nombre, products.imagen, products.id_tienda FROM productos_por_orden AS pro INNER JOIN productos AS products ON pro.id_producto = products.id_producto where pro.id_orden_compra ='${pxo}'`);
            res.send(pro);
        });
    }
    agregar_pro_orden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_pro = yield base_datos_1.default.query('INSERT INTO productos_por_orden set  ? ', [req.body]);
            res.json({ message: 'productos agregadoss agregada ' });
        });
    }
    actualizar_pro_orden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_pro = yield base_datos_1.default.query("UPDATE productos_por_orden SET  cantidad = ?, total_producto= ? WHERE id_producto_orden = ?", [req.body.cantidad, req.body.total_producto, req.params.id_producto_orden]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_pro = yield base_datos_1.default.query("DELETE from productos_por_orden where id_producto_orden = ? ", [Number(req.params.id_producto_orden)]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
}
const prodporordenController = new ProductosxordenController;
exports.default = prodporordenController;
