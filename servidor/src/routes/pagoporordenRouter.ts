import { Router } from 'express';

import pagoordenController from '../controles/PagoxordenController';
class PagoporordenlRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', pagoordenController.listar_pago_orden);
        this.router.get('/obtener/:id_pago_por_orden', pagoordenController.obtenerPorid);
        this.router.post('/traerPagoPorIdOrden/:id_orden_compra', pagoordenController.obtenerPagoPorIdOrden);
        this.router.post('/agregar', pagoordenController.agregar_pago_orden);
        
       
    }

}
const pago_orden = new PagoporordenlRoutes();
export default pago_orden.router;