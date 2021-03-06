import { Router } from 'express';

import tiendaController from '../controles/tiendaController';
class TiendaRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', tiendaController.listar_tiendas);
        this.router.get('/listarProActivos', tiendaController.listartiendasActivas);
        this.router.get('/obtener/:id_tienda', tiendaController.obtenerPorid);
        this.router.post('/Agregar', tiendaController.agregar_tienda);
        this.router.put('/actualizar/:id_tienda', tiendaController.actualizar_datos_tienda);
        this.router.put('/eliminar/:id_tienda', tiendaController.desactivar_tienda);
        this.router.put('/activar/:id_tienda', tiendaController.activar_teinda);
    }

}
const tienda = new TiendaRoutes();
export default tienda.router;