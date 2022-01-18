import { Router } from 'express';

import estadoproController from '../controles/estado_productoController';
class EstadoproRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', estadoproController.listar_estados);
        this.router.get('/obtener/:id_estado_pro', estadoproController.obtenerPorid);
       
    }

}
const estado_pro = new EstadoproRoutes();
export default estado_pro.router;