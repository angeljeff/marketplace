import { Request, Response } from 'express';
import pool from '../base_datos';

class VentasController {
  

    public async listar_ventas(req: Request, res: Response): Promise<void> {
        const lista_venta = await pool.query('SELECT * FROM ventas');
        res.send(lista_venta);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const venta = req.params.id_venta
        const vent = await pool.query(`SELECT * FROM ventas where id_venta ='${venta}'`);
        res.send(vent);
    }


    public async agregar_ventas(req: Request, res: Response): Promise<void> {
        const agrega_ventas = await pool.query('INSERT INTO ventas set  ? ', [req.body]);
        res.json({ message: 'venta agregada ' });
    }


   
}

const ventasController = new VentasController;
export default ventasController;

