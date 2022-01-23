import { Router } from 'express';

import productoController from '../controles/productoController';
class ProductoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', productoController.listar);
        this.router.get('/listarProActivos', productoController.listarProductosActivos);
        this.router.post('/obtener/:id_producto', productoController.obtenerPorid);
        this.router.post('/obtenerpro/:id_tienda', productoController.obtenerPoridtienda);
        this.router.post('/Agregar', productoController.agregar);
        this.router.put('/actualizar/:id_producto', productoController.actualizar);
        this.router.put('/eliminar/:id_producto', productoController.desactivar);
        this.router.put('/contador/:id_producto', productoController.actualizar_contador);
        this.router.post('/obtenerporidsub/:id_sub_categoria', productoController.obtenerPoridsubcategoria);
        
    }

}
const producto = new ProductoRoutes();
export default producto.router;