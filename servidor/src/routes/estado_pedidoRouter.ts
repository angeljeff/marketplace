import { Router } from 'express';

import estadopedController from '../controles/estado_pedidoController';
class EstadopedRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', estadopedController.listar_estados_pedi);
        this.router.get('/obtener/:id_estado_pedido', estadopedController.obtenerPorid);
       
    }

}
const estado_ped = new EstadopedRoutes();
export default estado_ped.router;