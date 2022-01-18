import { Router } from 'express';

import ordentemporalController from '../controles/ordentemporalController';
class OrdentemporalRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', ordentemporalController.listar_orden_temporal);
        this.router.get('/obtener/:id_orden_temporal', ordentemporalController.obtenerPorid);
        this.router.post('/Agregar', ordentemporalController.agregar_orden_temporal);
    }

}
const orden_temporal = new OrdentemporalRoutes();
export default orden_temporal.router;