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
            console.log(agrega_producto);
            res.json({ message: 'producto agregado' });
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_productos = yield base_datos_1.default.query('SELECT * FROM productos');
            res.send(lista_productos);
        });
    }
    listarprocompleto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_productos_com = yield base_datos_1.default.query('SELECT pro.nombre, pro.id_producto, pro.precio, pro.imagen, pro.stock, pro.id_sub_categoria, pro.id_tienda,pro.descripcion, sub.descripcion_sub, cat.descripcion_cat, cat.id_categoria FROM productos AS pro INNER JOIN sub_categorias AS sub ON pro.id_sub_categoria = sub.id_sub_categoria INNER JOIN categorias AS cat ON sub.id_categoria = cat.id_categoria where pro.id_estado_pro = 2');
            res.send(lista_productos_com);
        });
    }
    listarporsubcategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_productos_com = yield base_datos_1.default.query(`SELECT pro.nombre, pro.id_producto, pro.precio, pro.imagen, pro.stock, pro.id_sub_categoria, pro.id_tienda,pro.descripcion, sub.descripcion_sub, cat.descripcion_cat, cat.id_categoria FROM productos AS pro INNER JOIN sub_categorias AS sub ON pro.id_sub_categoria = sub.id_sub_categoria INNER JOIN categorias AS cat ON sub.id_categoria = cat.id_categoria where pro.id_estado_pro = 2 and pro.id_sub_categoria='${req.params.id_sub_categoria}'`);
            res.send(lista_productos_com);
        });
    }
    listarProductosActivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield base_datos_1.default.query('SELECT * FROM productos where id_estado_pro = 2');
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
    obtenerPoridtienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto1 = req.params.id_tienda;
            const pro1 = yield base_datos_1.default.query(`SELECT * FROM productos where id_tienda ='${producto1}'`);
            res.send(pro1);
        });
    }
    obtenerPoridsubcategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto2 = req.params.id_sub_categoria;
            const pro2 = yield base_datos_1.default.query(`SELECT * FROM productos where id_sub_categoria ='${producto2}'`);
            res.send(pro2);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_producto = yield base_datos_1.default.query("UPDATE productos SET  nombre= ?, precio = ? , descripcion = ? , stock = ? , imagen = ? , id_sub_categoria = ? WHERE id_producto = ?", [req.body.nombre, req.body.precio, req.body.descripcion, req.body.stock, req.body.imagen, req.body.id_sub_categoria, req.params.id_producto]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
    actualizar_contador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agrega_producto = yield base_datos_1.default.query("UPDATE productos SET  contador= ? WHERE id_producto = ?", [req.body.contador, req.params.id_producto]);
            res.json({ message: 'Producto actualizado ' });
        });
    }
    desactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desactiva_producto = yield base_datos_1.default.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?", [req.params.id_producto]);
            res.json({ message: 'Producto desactivado' });
        });
    }
    activar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const activa_producto = yield base_datos_1.default.query("UPDATE productos SET  id_estado_pro = 1 WHERE id_producto = ?", [req.params.id_producto]);
            res.json({ message: 'Producto publicado' });
        });
    }
    consultar_contador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualiza_conta = yield base_datos_1.default.query(`SELECT contador FROM productos where id_producto ='${req.params.id_producto}'`);
            res.send(actualiza_conta);
        });
    }
}
const productoController = new ProductoController;
exports.default = productoController;
/*

{
     
    "nombre":"ddd",
    "precio":4,
    "imagen":"jjjjjfff",
    "stock":3,
    "descripcion":"guasmo norte",
    "contador":1,
    "id_sub_categoria":2,
    "id_tienda":1,
    "id_estado_pro":1
    

}*/ 
