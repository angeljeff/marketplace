import { Request, Response } from 'express';
import pool from '../base_datos';

class BancoController {
  

    public async listar_bancos(req: Request, res: Response): Promise<void> {
        const lista_bancos = await pool.query('SELECT * FROM bancos');
        res.send(lista_bancos);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const banco = req.params.id_banco
        const ban = await pool.query(`SELECT * FROM bancos where id_banco ='${banco}'`);
        res.send(ban);
    }


   
}

const bancoController = new BancoController;
export default bancoController;

