import { Router } from 'express';

import metodo_pagoController from '../controles/metodo_pagoController';
class MetodopagRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', metodo_pagoController.listar_metodos_pago);
        this.router.get('/obtener/:id_metodo_pago', metodo_pagoController.obtenerPorid);
       
    }

}
const metodopago = new MetodopagRoutes();
export default metodopago.router;