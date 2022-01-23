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
class SubCategoriasController {
    agregar_subcategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_subcategoria = yield base_datos_1.default.query('INSERT INTO sub_categorias set  ? ', [req.body]);
            res.json({ message: 'subcategoria agregada ' });
        });
    }
    listar_subcategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_subcategorias = yield base_datos_1.default.query('SELECT * FROM sub_categorias');
            res.send(lista_subcategorias);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcategoria = req.params.id_sub_categoria;
            const subcat = yield base_datos_1.default.query(`SELECT * FROM sub_categorias where id_sub_categoria ='${subcategoria}'`);
            res.send(subcat);
        });
    }
    obtenerPoridcat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcategoria1 = req.params.id_categoria;
            const subcat1 = yield base_datos_1.default.query(`SELECT * FROM sub_categorias where id_categoria ='${subcategoria1}'`);
            res.send(subcat1);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_producto = yield base_datos_1.default.query("UPDATE sub_categorias SET  descripcion_sub= ?,   WHERE id_sub_categoria = ?", [req.body.descripcion, req.params.id_sub_categoria]);
            res.json({ message: 'subCategoria actualizada ' });
        });
    }
}
const subcategoriaController = new SubCategoriasController;
exports.default = subcategoriaController;
