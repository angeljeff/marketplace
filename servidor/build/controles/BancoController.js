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
class BancoController {
    listar_bancos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_bancos = yield base_datos_1.default.query('SELECT * FROM bancos');
            res.send(lista_bancos);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const banco = req.params.id_banco;
            const ban = yield base_datos_1.default.query(`SELECT * FROM bancos where id_banco ='${banco}'`);
            res.send(ban);
        });
    }
}
const bancoController = new BancoController;
exports.default = bancoController;
