import { Request, Response } from 'express';
import pool from '../base_datos';

class CategoriasController {
    public async agregar_categoria(req: Request, res: Response): Promise<void> {
        const agrega_categoria = await pool.query('INSERT INTO categorias set  ? ', [req.body]);
        res.json({ message: 'categoria agregada ' });
    }

    public async listar_categoria(req: Request, res: Response): Promise<void> {
        const lista_categorias = await pool.query('SELECT * FROM categorias');
        res.send(lista_categorias);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const categoria = req.params.id_categoria
        const cat = await pool.query(`SELECT * FROM categorias where id_categoria ='${categoria}'`);
        res.send(cat);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const agrega_producto = await pool.query("UPDATE categorias SET  descripcion_cat= ?  WHERE id_categoria = ?",
        [req.body.descripcion,   req.params.id_categoria]);
        res.json({ message: 'Categoria actualizada ' });
    }


   
}

const categoriaController = new CategoriasController;
export default categoriaController;


