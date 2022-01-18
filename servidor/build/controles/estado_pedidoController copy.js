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
class EstadopedidoController {
    listar_estados_pedi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_estados_ped = yield base_datos_1.default.query('SELECT * FROM estado_pedido');
            res.send(lista_estados_ped);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estado_ped = req.params.id_estado_pedido;
            const estado = yield base_datos_1.default.query(`SELECT * FROM estado_pedido where id_estado_pedido ='${estado_ped}'`);
            res.send(estado);
        });
    }
}
const estadopedController = new EstadopedidoController;
exports.default = estadopedController;
