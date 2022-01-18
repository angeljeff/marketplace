import { Router } from 'express';

import metodopagtiendaController from '../controles/metodopagotiendaController';
class MetpagoTiRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', metodopagtiendaController.listar_meto_tienda);
        this.router.get('/obtener/:id_metodo_pago_tienda', metodopagtiendaController.obtenerPorid);
        this.router.post('/Agregar', metodopagtiendaController.agregar_meto_tienda);
    }

}
const metodo_pag_tienda = new MetpagoTiRoutes();
export default metodo_pag_tienda.router;