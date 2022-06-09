import { Router } from 'express';

import productoController from '../controles/productoController';
class ProductoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', productoController.listar);
        this.router.get('/listarprocompletoadmin', productoController.listarprocompletoadmi);
        this.router.get('/listarProActivos', productoController.listarProductosActivos);
        this.router.get('/listarProcompletos', productoController.listarprocompleto);
        this.router.post('/listarporsub/:id_sub_categoria', productoController.listarporsubcategorias);
        this.router.post('/obtener/:id_producto', productoController.obtenerPorid);
        this.router.post('/obtenerprocomporid/:id_producto', productoController.listarprocompletoporid);
        this.router.post('/obtenerpro/:id_tienda', productoController.obtenerPoridtienda);
        this.router.post('/Agregar', productoController.agregar);
        this.router.put('/actualizar/:id_producto', productoController.actualizar);
        this.router.put('/actualizarEstado/:id_producto', productoController.actualizar_estado);
        this.router.put('/eliminar/:id_producto', productoController.eliminarproducto);
        this.router.put('/rechazar/:id_producto', productoController.desactivar);
        this.router.put('/contador/:id_producto', productoController.actualizar_contador);
        this.router.put('/updateStock/:id_producto', productoController.actualizar_stock);
        this.router.post('/obtenerporidsub/:id_sub_categoria', productoController.obtenerPoridsubcategoria);
        
    }

}
const producto = new ProductoRoutes();
export default producto.router;