import { Request, Response } from 'express';
import pool from '../base_datos';

class SubCategoriasController {
    public async agregar_subcategoria(req: Request, res: Response): Promise<void> {
        const agrega_subcategoria = await pool.query('INSERT INTO sub_categorias set  ? ', [req.body]);
        res.json({ message: 'subcategoria agregada ' });
    }

    public async listar_subcategoria(req: Request, res: Response): Promise<void> {
        const lista_subcategorias = await pool.query('SELECT * FROM sub_categorias');
        res.send(lista_subcategorias);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const subcategoria = req.params.id_sub_categoria
        const subcat = await pool.query(`SELECT * FROM sub_categorias where id_sub_categoria ='${subcategoria}'`);
        res.send(subcat);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const agrega_producto = await pool.query("UPDATE sub_categorias SET  descripcion= ?,   WHERE id_sub_categoria = ?",
        [req.body.descripcion,   req.params.id_sub_categoria]);
        res.json({ message: 'subCategoria actualizada ' });
    }


   
}

const subcategoriaController = new SubCategoriasController;
export default subcategoriaController;


