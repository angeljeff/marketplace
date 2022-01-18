import { Request, Response } from 'express';
import pool from '../base_datos';

class TipoUsuarioController {
  

    public async listar_tipos_usuarios(req: Request, res: Response): Promise<void> {
        const lista_tipos_usu = await pool.query('SELECT * FROM tipo_usuario');
        res.send(lista_tipos_usu);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const tipo = req.params.id_tipo_usuario
        const tipo_usu = await pool.query(`SELECT * FROM tipo_usuario where id_tipo_usuario ='${tipo}'`);
        res.send(tipo_usu);
    }


   
}

const tipousuController = new TipoUsuarioController;
export default tipousuController;

