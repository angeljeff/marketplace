import { Request, Response } from 'express';
import pool from '../base_datos';

class PagoporordenController {
  

    public async listar_pago_orden(req: Request, res: Response): Promise<void> {
        const pago = await pool.query('SELECT * FROM pago_por_orden');
        res.send(pago);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const orden = req.params.id_pago_por_orden
        const ord = await pool.query(`SELECT * FROM pago_por_orden where id_pago_por_orden ='${orden}'`);
        res.send(ord);
    }


    public async agregar_pago_orden(req: Request, res: Response): Promise<void> {
        const agrega_orden_tempor = await pool.query('INSERT INTO pago_por_orden set  ? ', [req.body]);
        res.json({ message: 'pago agregado ' });
    }

    public async obtenerPagoPorIdOrden(req: Request, res: Response): Promise<void> {
        const ord = await pool.query('SELECT * FROM pago_por_orden where id_orden_compra =  ? ', [req.params.id_orden_compra]);
        res.send(ord);
    }


   
}

const pagoordenController = new PagoporordenController;
export default pagoordenController;

