import { Request, Response } from 'express';
import pool from '../base_datos';

class CantonesController {
  

    public async listar_cantones(req: Request, res: Response): Promise<void> {
        const lista_cantones = await pool.query('SELECT * FROM cantones');
        res.send(lista_cantones );
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const canton = req.params.id_canton
        const can = await pool.query(`SELECT * FROM cantones where id_cantones ='${canton}'`);
        res.send(can);
    }


   
}

const cantonController = new CantonesController;
export default cantonController;

