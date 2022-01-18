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
    agregar_orden_compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_metodo_tienda = yield base_datos_1.default.query('INSERT INTO orden_compra set  ? ', [req.body]);
            res.json({ message: 'orden de compra agregada ' });
        });
    }
}
const ordencompraController = new OrdencompraController;
exports.default = ordencompraController;
