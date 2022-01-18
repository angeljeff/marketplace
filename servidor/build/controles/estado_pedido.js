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
class EstadoproductoController {
    listar_estados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_estados = yield base_datos_1.default.query('SELECT * FROM estado-producto');
            res.send(lista_estados);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estado = req.params.estado;
            const estad = yield base_datos_1.default.query(`SELECT * FROM estado-producto where id_estado_pro ='${estado}'`);
            res.send(estad);
        });
    }
}
const estadoproController = new EstadoproductoController;
exports.default = estadoproController;
