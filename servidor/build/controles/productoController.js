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
class ProductoController {
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
            const agrega_producto = yield base_datos_1.default.query('INSERT INTO productos set  ? ', [req.body]);
            res.json({ message: 'producto agregado' });
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_productos = yield base_datos_1.default.query('SELECT * FROM productos');
            res.send(lista_productos);
        });
    }
    listarProductosActivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield base_datos_1.default.query('SELECT * FROM productos where id_estado_pro = 1');
            res.send(lista);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = req.params.id_producto;
            const pro = yield base_datos_1.default.query(`SELECT * FROM productos where id_producto ='${producto}'`);
            res.send(pro);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_usuario = yield base_datos_1.default.query("UPDATE productos SET  nombre= ?, precio = ? , descripcion = ? WHERE id_producto = ?", [req.body.nombre, req.body.precio, req.params.descripcion, req.params.id_producto]);
            res.json({ message: 'Producto actualizado 2' });
        });
    }
    desactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield base_datos_1.default.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?", [req.params.id_producto]);
            res.json({ message: 'Usuario ELIMINADO' });
        });
    }
    activar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield base_datos_1.default.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?", [req.params.id_producto]);
            res.json({ message: 'Usuario ELIMINADO' });
        });
    }
}
const productoController = new ProductoController;
exports.default = productoController;
/*
{
    "cedula":"1111111",
    "id_tipo_usuario":11,
    "id_cantones":2,
    "nombres":"heffferso",
    "apelllidos":"vv vvv",
    "direccion":"guasmo norte",
    "fecha_nacimiento":"10/12/12",
    "genero":"maculon",
    "correo":"112222",
    "contraseña":"fdfdgddd"
}*/ 
