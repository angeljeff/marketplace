import { Request, Response } from 'express';
import pool from '../base_datos';

class ProductoController {
    public async agregar(req: Request, res: Response): Promise<void> {
        //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
        const agrega_producto = await pool.query('INSERT INTO productos set  ? ', [req.body]);
        console.log(agrega_producto)
        res.json({ message: 'producto agregado' });
    }

    public async listar(req: Request, res: Response): Promise<void> {
        const lista_productos = await pool.query('SELECT * FROM productos');
        res.send(lista_productos);
    }
    public async listarprocompleto(req: Request, res: Response): Promise<void> {
        const lista_productos_com = await pool.query('SELECT pro.nombre, pro.id_producto, pro.precio, pro.imagen, pro.stock, pro.id_sub_categoria, pro.id_tienda,pro.descripcion, sub.descripcion_sub, cat.descripcion_cat, cat.id_categoria FROM productos AS pro INNER JOIN sub_categorias AS sub ON pro.id_sub_categoria = sub.id_sub_categoria INNER JOIN categorias AS cat ON sub.id_categoria = cat.id_categoria where pro.id_estado_pro = 2');
        res.send(lista_productos_com);
    }
    public async listarporsubcategorias(req: Request, res: Response): Promise<void> {
        const lista_productos_com = await pool.query(`SELECT pro.nombre, pro.id_producto, pro.precio, pro.imagen, pro.stock, pro.id_sub_categoria, pro.id_tienda,pro.descripcion, sub.descripcion_sub, cat.descripcion_cat, cat.id_categoria FROM productos AS pro INNER JOIN sub_categorias AS sub ON pro.id_sub_categoria = sub.id_sub_categoria INNER JOIN categorias AS cat ON sub.id_categoria = cat.id_categoria where pro.id_estado_pro = 2 and pro.id_sub_categoria='${req.params.id_sub_categoria}'`);
        res.send(lista_productos_com);
    }

    public async listarProductosActivos(req: Request, res: Response): Promise<void> {
        const lista = await pool.query('SELECT * FROM productos where id_estado_pro = 2');
        res.send(lista);
    }

    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const producto = req.params.id_producto
        const pro = await pool.query(`SELECT * FROM productos where id_producto ='${producto}'`);
        
        res.send(pro);
    }

    public async obtenerPoridtienda(req: Request, res: Response): Promise<void> {
        const producto1 = req.params.id_tienda
        const pro1 = await pool.query(`SELECT * FROM productos where id_tienda ='${producto1}'`);
        
        res.send(pro1);
    }

    public async obtenerPoridsubcategoria(req: Request, res: Response): Promise<void> {
        const producto2 = req.params.id_sub_categoria
        const pro2 = await pool.query(`SELECT * FROM productos where id_sub_categoria ='${producto2}'`);
        
        res.send(pro2);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const agrega_producto = await pool.query("UPDATE productos SET  nombre= ?, precio = ? , descripcion = ? , stock = ? , imagen = ? , id_sub_categoria = ? WHERE id_producto = ?",
        [req.body.nombre, req.body.precio,  req.body.descripcion,  req.body.stock ,  req.body.imagen, req.body.id_sub_categoria ,  req.params.id_producto]);
        res.json({ message: 'Producto actualizado ' });
    }

    public async actualizar_contador(req: Request, res: Response): Promise<void> {
        const agrega_producto = await pool.query("UPDATE productos SET  contador= ? WHERE id_producto = ?",
        [req.body.contador ,   req.params.id_producto]);
        res.json({ message: 'Producto actualizado ' });
    }

    public async desactivar(req: Request, res: Response): Promise<void> {
        const desactiva_producto = await pool.query("UPDATE productos SET  id_estado_pro = 2 WHERE id_producto = ?",[ req.params.id_producto]);
        res.json({ message: 'Producto desactivado' });
    }

    public async activar(req: Request, res: Response): Promise<void> {
        const activa_producto = await pool.query("UPDATE productos SET  id_estado_pro = 1 WHERE id_producto = ?",[ req.params.id_producto]);
        res.json({ message: 'Producto publicado' });
    }


    public async consultar_contador(req: Request, res: Response): Promise<void> {
        const actualiza_conta = await pool.query(`SELECT contador FROM productos where id_producto ='${req.params.id_producto}'`);

        res.send(actualiza_conta);
    }

   
}

const productoController = new ProductoController;
export default productoController;


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