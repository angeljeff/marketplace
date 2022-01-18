import { Request, Response } from 'express';
import pool from '../base_datos';

class EstadopedidoController {
  

    public async listar_estados_pedi(req: Request, res: Response): Promise<void> {
        const lista_estados_ped = await pool.query('SELECT * FROM estado_pedido');
        res.send(lista_estados_ped);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const estado_ped = req.params.id_estado_pedido
        const estado = await pool.query(`SELECT * FROM estado_pedido where id_estado_pedido ='${estado_ped}'`);
        res.send(estado);
    }


   
}

const estadopedController = new EstadopedidoController;
export default estadopedController;

