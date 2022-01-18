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


    public async agregar_pro_orden(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query('INSERT INTO productos_por_orden set  ? ', [req.body]);
        res.json({ message: 'productos agregadoss agregada ' });
    }


   
}

const prodporordenController = new ProductosxordenController;
export default prodporordenController;

