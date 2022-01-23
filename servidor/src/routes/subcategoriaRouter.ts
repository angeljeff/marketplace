import { Router } from 'express';

import subcategoriaController from '../controles/subcategoriaController';
class SubCategoriaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', subcategoriaController.listar_subcategoria);
        this.router.get('/obtener/:id_sub_categoria', subcategoriaController.obtenerPorid);
        this.router.post('/Agregar', subcategoriaController.agregar_subcategoria);
        this.router.put('/actualizar/:id_sub_categoria', subcategoriaController.actualizar);
        this.router.post('/obtenerporcat/:id_categoria', subcategoriaController.obtenerPoridcat);
       
    }

}
const subcategoria = new SubCategoriaRoutes();
export default subcategoria.router;