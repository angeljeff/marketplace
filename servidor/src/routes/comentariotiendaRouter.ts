import { Router } from 'express';

import tiendaController from '../controles/comentarioTiendaController';
class ComentarioTiendaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', tiendaController.listar_comentarios);
/*         this.router.get('/listarProActivos', tiendaController.listartiendasActivas);
        this.router.post('/obtener/:id_tienda', tiendaController.obtenerPorid); */
        this.router.post('/Agregar', tiendaController.agregar_comentario);
        this.router.post('/obtener/:id_tienda', tiendaController.obtenerPorTienda);
/*         this.router.put('/actualizar/:id_tienda', tiendaController.actualizar_datos_tienda);
        this.router.put('/eliminar/:id_tienda', tiendaController.desactivar_tienda);
        this.router.put('/activar/:id_tienda', tiendaController.activar_teinda);
        this.router.put('/contador/:id_tienda', tiendaController.actualizar_contador);
        this.router.post('/obtenertienda/:cedula', tiendaController.obtenerPorcedula); */
    }

}
const comentario_tienda = new ComentarioTiendaRoutes();
export default comentario_tienda.router;