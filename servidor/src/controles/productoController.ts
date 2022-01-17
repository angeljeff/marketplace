import { Request, Response } from 'express';
import pool from '../base_datos';

class ProductoController {
    public async agregar(req: Request, res: Response): Promise<void> {
        //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
        const agrega_producto = await pool.query('INSERT INTO productos set  ? ', [req.body]);
        res.json({ message: 'producto agregado' });
    }

    public async listar(req: Request, res: Response): Promise<void> {
        const lista_productos = await pool.query('SELECT * FROM productos');
        res.send(lista_productos);
    }

    public async listarProductosActivos(req: Request, res: Response): Promise<void> {
        const lista = await pool.query('SELECT * FROM productos where id_estado_pro = 1');
        res.send(lista);
    }

    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const producto = req.params.id_producto
        const pro = await pool.query(`SELECT * FROM productos where id_producto ='${producto}'`);
        res.send(pro);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const agrega_usuario = await pool.query("UPDATE productos SET  nombre= ?, precio = ? , descripcion = ? WHERE id_producto = ?",
        [req.body.nombre, req.body.precio,  req.params.descripcion,  req.params.id_producto]);
        res.json({ message: 'Producto actualizado 2' });
    }

    public async desactivar(req: Request, res: Response): Promise<void> {
        const usuario = await pool.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?",[ req.params.id_producto]);
        res.json({ message: 'Usuario ELIMINADO' });
    }

    public async activar(req: Request, res: Response): Promise<void> {
        const usuario = await pool.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?",[ req.params.id_producto]);
        res.json({ message: 'Usuario ELIMINADO' });
    }
   
}

const productoController = new ProductoController;
export default productoController;


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