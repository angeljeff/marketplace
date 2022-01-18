import { Request, Response } from 'express';
import pool from '../base_datos';

class MetodopagoController {
  

    public async listar_metodos_pago(req: Request, res: Response): Promise<void> {
        const lista_meto = await pool.query('SELECT * FROM metodo_pago');
        res.send(lista_meto);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const metodo = req.params.id_metodo_pago
        const met = await pool.query(`SELECT * FROM metodo_pago where id_metodo_pago ='${metodo}'`);
        res.send(met);
    }


   
}

const metodo_pagoController = new MetodopagoController;
export default metodo_pagoController;

