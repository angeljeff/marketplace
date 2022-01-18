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
class OrdentemporalController {
    listar_orden_temporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_orden_temporal = yield base_datos_1.default.query('SELECT * FROM orden_temporal');
            res.send(lista_orden_temporal);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orden = req.params.id_orden_temporal;
            const ord = yield base_datos_1.default.query(`SELECT * FROM orden_temporal where id_orden_temporal ='${orden}'`);
            res.send(ord);
        });
    }
    agregar_orden_temporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_orden_tempor = yield base_datos_1.default.query('INSERT INTO orden_temporal set  ? ', [req.body]);
            res.json({ message: 'orden temporal agregada ' });
        });
    }
}
const ordentemporalController = new OrdentemporalController;
exports.default = ordentemporalController;
