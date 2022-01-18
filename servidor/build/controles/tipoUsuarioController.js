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
class TipoUsuarioController {
    listar_tipos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_tipos_usu = yield base_datos_1.default.query('SELECT * FROM tipo_usuario');
            res.send(lista_tipos_usu);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipo = req.params.id_tipo_usuario;
            const tipo_usu = yield base_datos_1.default.query(`SELECT * FROM tipo_usuario where id_tipo_usuario ='${tipo}'`);
            res.send(tipo_usu);
        });
    }
}
const tipousuController = new TipoUsuarioController;
exports.default = tipousuController;
