import { Router } from 'express';

import ordencompraController from '../controles/orden_compraController';
class OrdenCompraRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', ordencompraController.listar_orden_compra);
        this.router.post('/obtener/:id_orden_compra', ordencompraController.obtenerPorid);
        this.router.post('/traerOrdenUsuario/:cedula', ordencompraController.obtenerPorUsuarioCedula);
        this.router.post('/agregar', ordencompraController.agregar_orden_compra);
        this.router.put('/actualizar/:id_orden_compra', ordencompraController.actualizar_orden_compra);
    }

}
const orden_compra = new OrdenCompraRoutes();
export default orden_compra.router;