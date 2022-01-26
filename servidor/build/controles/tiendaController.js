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
class TiendaController {
    agregar_tienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
            const agrega_producto = yield base_datos_1.default.query('INSERT INTO tiendas set  ? ', [req.body]);
            res.json({ message: 'Tienda agregada' });
        });
    }
    listar_tiendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_tiendas = yield base_datos_1.default.query('SELECT * FROM tiendas');
            res.send(lista_tiendas);
        });
    }
    listartiendasActivas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_ti_ac = yield base_datos_1.default.query('SELECT * FROM tiendas where id_estado_tienda = 1');
            res.send(lista_ti_ac);
        });
    }
    obtenerPorid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tienda = req.params.id_tienda;
            const tiend = yield base_datos_1.default.query(`SELECT * FROM tiendas where id_tienda ='${tienda}'`);
            res.send(tiend);
        });
    }
    obtenerPorcedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tiendas = req.params.cedula;
            const tiendaa = yield base_datos_1.default.query(`SELECT * FROM tiendas where cedula ='${tiendas}'`);
            res.send(tiendaa);
        });
    }
    actualizar_datos_tienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualiza_tienda = yield base_datos_1.default.query("UPDATE tiendas SET  nombre= ?, direccion = ? , correo_electronico = ? , hora_apertura = ?, hora_cierre = ?, descripcion = ?, telefono = ? , id_cantones = ? WHERE id_tienda = ?", [req.body.nombre, req.body.direccion, req.body.correo_electronico, req.body.hora_apertura, req.body.hora_cierre, req.body.descripcion, req.body.telefono, req.body.id_cantones, req.params.id_tienda]);
            res.json({ message: 'tienda actualizada' });
        });
    }
    desactivar_tienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desactiva_tiendao = yield base_datos_1.default.query("UPDATE tiendas SET  id_estado_tienda=2 WHERE id_tienda = ?", [req.params.id_tienda]);
            res.json({ message: 'tienda eliminada' });
        });
    }
    activar_teinda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const activa_tienda = yield base_datos_1.default.query("UPDATE tiendas SET id_estado_tienda=1 WHERE id_tienda = ?", [req.params.id_tienda]);
            res.json({ message: 'tienda activada' });
        });
    }
}
const tiendaController = new TiendaController;
exports.default = tiendaController;
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
