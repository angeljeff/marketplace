import { Router } from 'express';

import categoriaController from '../controles/CategoriasController';
class CategoriaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', categoriaController.listar_categoria);
        this.router.get('/obtener/:id_categoria', categoriaController.obtenerPorid);
        this.router.post('/Agregar', categoriaController.agregar_categoria);
        this.router.put('/actualizar/:id_categoria', categoriaController.actualizar);
    }

}
const categoria = new CategoriaRoutes();
export default categoria.router;