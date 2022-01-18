import { Router } from 'express';

import cantonController from '../controles/cantonesController';
class CantonesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', cantonController.listar_cantones);
        this.router.get('/obtener/:id_cantones', cantonController.obtenerPorid);
       
    }

}
const canton = new CantonesRoutes();
export default canton.router;