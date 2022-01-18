import { Request, Response } from 'express';
import pool from '../base_datos';

class EstadoproductoController {
  

    public async listar_estados(req: Request, res: Response): Promise<void> {
        const lista_estados = await pool.query('SELECT * FROM estado_productos');
        res.send(lista_estados);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const estado = req.params.estado
        const estad = await pool.query(`SELECT * FROM estado_productos where id_estado_pro ='${estado}'`);
        res.send(estad);
    }


   
}

const estadoproController = new EstadoproductoController;
export default estadoproController;

