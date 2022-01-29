import { Router } from 'express';

import prodporordenController from '../controles/productosxordenController';
class ProductosporordenRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', prodporordenController.listar_pro_orden);
        this.router.post('/obtener/:id_producto_orden', prodporordenController.obtenerPorid);
        this.router.post('/obtenerPorIdOrden/:id_orden_compra', prodporordenController.obtenerPorIdOrdenCompra);
        this.router.post('/obtenerPorIdOrdenDTO/:id_orden_compra', prodporordenController.obtenerPorIdOrdenCompraDTO);
        this.router.post('/agregar', prodporordenController.agregar_pro_orden);
        this.router.put('/actualizar/:id_producto_orden', prodporordenController.actualizar_pro_orden);
        this.router.delete('/eliminar/:id_producto_orden', prodporordenController.eliminar);
    }

}
const productosxorden = new ProductosporordenRoutes();
export default productosxorden.router;