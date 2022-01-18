import { Request, Response } from 'express';
import pool from '../base_datos';

class EstadotiendaController {
  

    public async listar_estados_tienda(req: Request, res: Response): Promise<void> {
        const lista_estados_ti = await pool.query('SELECT * FROM estado_tienda');
        res.send(lista_estados_ti);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const estado_tienda = req.params.id_estado_tienda
        const estad_t = await pool.query(`SELECT * FROM estado_tienda where id_estado_tienda ='${estado_tienda}'`);
        res.send(estad_t);
    }


   
}

const estadotiController = new EstadotiendaController;
export default estadotiController;

