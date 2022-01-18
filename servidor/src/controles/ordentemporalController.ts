import { Request, Response } from 'express';
import pool from '../base_datos';

class OrdentemporalController {
  

    public async listar_orden_temporal(req: Request, res: Response): Promise<void> {
        const lista_orden_temporal = await pool.query('SELECT * FROM orden_temporal');
        res.send(lista_orden_temporal);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const orden = req.params.id_orden_temporal
        const ord = await pool.query(`SELECT * FROM orden_temporal where id_orden_temporal ='${orden}'`);
        res.send(ord);
    }


    public async agregar_orden_temporal(req: Request, res: Response): Promise<void> {
        const agrega_orden_tempor = await pool.query('INSERT INTO orden_temporal set  ? ', [req.body]);
        res.json({ message: 'orden temporal agregada ' });
    }


   
}

const ordentemporalController = new OrdentemporalController;
export default ordentemporalController;

