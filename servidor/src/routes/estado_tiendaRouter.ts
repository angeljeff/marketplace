import { Router } from 'express';

import estadotiController from '../controles/estado_tiendaController';
class EstadotiRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', estadotiController.listar_estados_tienda);
        this.router.get('/obtener/:id_estado_tienda', estadotiController.obtenerPorid);
       
    }

}
const estado_ti = new EstadotiRoutes();
export default estado_ti.router;