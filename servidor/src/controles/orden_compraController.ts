import { Request, Response } from 'express';
import pool from '../base_datos';

class OrdencompraController {
  

    public async listar_orden_compra(req: Request, res: Response): Promise<void> {
        const lista_orden = await pool.query('SELECT * FROM orden_compra');
        res.send(lista_orden);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const orden = req.params.id_orden_compra
        const ord = await pool.query(`SELECT * FROM orden_compra where id_orden_compra ='${orden}'`);
        res.send(ord);
    }


    public async agregar_orden_compra(req: Request, res: Response): Promise<void> {
        const agrega_metodo_tienda = await pool.query('INSERT INTO orden_compra set  ? ', [req.body]);
        res.json({ message: 'orden de compra agregada ' });
    }


   
}

const ordencompraController = new OrdencompraController;
export default ordencompraController;

