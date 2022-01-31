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
        this.router.post('/obtenerOrdenesPorTienda/:id_tienda', ordencompraController.obtenerOrdenesPorTienda);
        this.router.post('/traerOrdenUsuario/:cedula', ordencompraController.obtenerPorUsuarioCedula);
        this.router.post('/traerOrdenUsuarioDTO/:cedula', ordencompraController.obtenerPorUsuarioCedulaDTO);
        this.router.post('/agregar', ordencompraController.agregar_orden_compra);
        this.router.put('/actualizar/:id_orden_compra', ordencompraController.actualizar_orden_compra);
        this.router.put('/actualizarEstado/:id_orden_compra', ordencompraController.actualizar_estado);
    }

}
const orden_compra = new OrdenCompraRoutes();
export default orden_compra.router;