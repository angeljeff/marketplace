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
class ComentarioTiendaController {
    agregar_comentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
            const agrega_producto = yield base_datos_1.default.query('INSERT INTO comentarios_tiendas set  ? ', [req.body]);
            res.json({ message: 'Comentario agregada' });
        });
    }
    listar_comentarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_comentarios = yield base_datos_1.default.query('SELECT * FROM comentarios_tiendas');
            res.send(lista_comentarios);
        });
    }
    obtenerPorTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_tienda = req.params.id_tienda;
            const usuario = yield base_datos_1.default.query(`SELECT com.*, usu.nombres, usu.apellidos FROM comentarios_tiendas as com inner join usuarios as usu on com.cedula=usu.cedula where com.id_tienda ='${id_tienda}'`);
            res.send(usuario);
        });
    }
}
const comentariostiendaController = new ComentarioTiendaController;
exports.default = comentariostiendaController;
