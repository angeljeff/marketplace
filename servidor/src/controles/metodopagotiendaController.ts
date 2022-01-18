import { Request, Response } from 'express';
import pool from '../base_datos';

class MetodopagoTiendaController {
  

    public async listar_meto_tienda(req: Request, res: Response): Promise<void> {
        const lista_meto = await pool.query('SELECT * FROM metodo_pago_tienda');
        res.send(lista_meto);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const metodo = req.params.id_cuenta_banco
        const mpt = await pool.query(`SELECT * FROM metodo_pago_tienda where id_metodo_pago_tienda ='${metodo}'`);
        res.send(mpt);
    }


    public async agregar_meto_tienda(req: Request, res: Response): Promise<void> {
        const agrega_metodo_tienda = await pool.query('INSERT INTO metodo_pago_tienda set  ? ', [req.body]);
        res.json({ message: 'metodo de pago agregado agregada ' });
    }


   
}

const metodopagtiendaController = new MetodopagoTiendaController;
export default metodopagtiendaController;

