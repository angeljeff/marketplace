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
class VentasController {
    listar_ventas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_venta = yield base_datos_1.default.query('SELECT * FROM ventas');
            res.send(lista_venta);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const venta = req.params.id_venta;
            const vent = yield base_datos_1.default.query(`SELECT * FROM ventas where id_venta ='${venta}'`);
            res.send(vent);
        });
    }
    agregar_ventas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_ventas = yield base_datos_1.default.query('INSERT INTO ventas set  ? ', [req.body]);
            res.json({ message: 'venta agregada ' });
        });
    }
    consultar_ventas_prediccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.params.fecha;
            const agrega_ventas = yield base_datos_1.default.query(`SELECT v.fecha, sum(orden.total) as total FROM ventas as v inner join orden_compra as orden on v.id_orden_compra= orden.id_orden_compra where fecha >='${fecha}' group by v.fecha`);
            res.send(agrega_ventas);
        });
    }
}
const ventasController = new VentasController;
exports.default = ventasController;
