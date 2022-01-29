import { Request, Response } from 'express';
import pool from '../base_datos';

class ProductosxordenController {
  

    public async listar_pro_orden(req: Request, res: Response): Promise<void> {
        const lista_pro = await pool.query('SELECT * FROM productos_por_orden');
        res.send(lista_pro);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const pxo = req.params.id_producto_orden
        const pro = await pool.query(`SELECT * FROM productos_por_orden where id_producto_orden ='${pxo}'`);
        res.send(pro);
    }

    public async obtenerPorIdOrdenCompra(req: Request, res: Response): Promise<void> {
        const pxo = req.params.id_orden_compra
        const pro = await pool.query(`SELECT * FROM productos_por_orden where id_orden_compra ='${pxo}'`);
        res.send(pro);
    }

    public async obtenerPorIdOrdenCompraDTO(req: Request, res: Response): Promise<void> {
        const pxo = req.params.id_orden_compra
        const pro = await pool.query(`SELECT pro.id_producto_orden, pro.id_orden_compra, pro.id_producto, pro.cantidad, pro.precio_producto, pro.total_producto , products.nombre, products.imagen, products.id_tienda FROM productos_por_orden AS pro INNER JOIN productos AS products ON pro.id_producto = products.id_producto where pro.id_orden_compra ='${pxo}'`);
        res.send(pro);
    }




    public async agregar_pro_orden(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query('INSERT INTO productos_por_orden set  ? ', [req.body]);
        res.json({ message: 'productos agregadoss agregada ' });
    }
    public async actualizar_pro_orden(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query("UPDATE productos_por_orden SET  cantidad = ?, total_producto= ? WHERE id_producto_orden = ?",
        [req.body.cantidad, req.body.total_producto, req.params.id_producto_orden]);
        res.json({ message: 'Producto actualizado ' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query("DELETE from productos_por_orden where id_producto_orden = ? ", [ Number(req.params.id_producto_orden)]);
        res.json({ message: 'Producto actualizado ' });
    }


   
}

const prodporordenController = new ProductosxordenController;
export default prodporordenController;

