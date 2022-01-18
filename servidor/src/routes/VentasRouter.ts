import { Router } from 'express';

import ventasController from '../controles/VentasController';
class VentasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', ventasController.listar_ventas);
        this.router.get('/obtener/:id_venta', ventasController.obtenerPorid);
        this.router.post('/Agregar', ventasController.agregar_ventas);
    }

}
const ventas = new VentasRoutes();
export default ventas.router;