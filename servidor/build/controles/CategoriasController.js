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
class CategoriasController {
    agregar_categoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_categoria = yield base_datos_1.default.query('INSERT INTO categorias set  ? ', [req.body]);
            res.json({ message: 'categoria agregada ' });
        });
    }
    listar_categoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_categorias = yield base_datos_1.default.query('SELECT * FROM categorias');
            res.send(lista_categorias);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = req.params.id_categoria;
            const cat = yield base_datos_1.default.query(`SELECT * FROM categorias where id_categoria ='${categoria}'`);
            res.send(cat);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_producto = yield base_datos_1.default.query("UPDATE categorias SET  descripcion_cat= ?  WHERE id_categoria = ?", [req.body.descripcion, req.params.id_categoria]);
            res.json({ message: 'Categoria actualizada ' });
        });
    }
}
const categoriaController = new CategoriasController;
exports.default = categoriaController;
