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
class MetodopagoController {
    listar_metodos_pago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_meto = yield base_datos_1.default.query('SELECT * FROM metodo_pago');
            res.send(lista_meto);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const metodo = req.params.id_metodo_pago;
            const met = yield base_datos_1.default.query(`SELECT * FROM metodo_pago where id_metodo_pago ='${metodo}'`);
            res.send(met);
        });
    }
}
const metodo_pagoController = new MetodopagoController;
exports.default = metodo_pagoController;
