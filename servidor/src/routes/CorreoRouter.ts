import { Router } from 'express';

import CorreoenviarController from '../controles/CorreoController';
class CorreoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/enviarcorreocontra', CorreoenviarController.enviarcorreocontrasenia);
        this.router.post('/enviarcorreoaprueba', CorreoenviarController.enviarcorreoaprobaproducto);
        this.router.post('/enviarcorreoapruebapedido', CorreoenviarController.enviarcorreoaprobapedido);
        this.router.post('/enviarcorreotienda', CorreoenviarController.enviarcorreotienda);
        
       
    }

}
const correo = new CorreoRoutes();
export default correo.router;