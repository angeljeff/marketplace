import { Router } from 'express';

import prodporordenController from '../controles/productosxordenController';
class ProductosporordenRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', prodporordenController.listar_pro_orden);
        this.router.get('/obtener/:id_producto_orden', prodporordenController.obtenerPorid);
        this.router.post('/Agregar', prodporordenController.agregar_pro_orden);
    }

}
const productosxorden = new ProductosporordenRoutes();
export default productosxorden.router;