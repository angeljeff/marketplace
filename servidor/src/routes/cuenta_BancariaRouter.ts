import { Router } from 'express';

import cuentabancoController from '../controles/cuenta_bancariaController';
class CuentaBanRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', cuentabancoController.listar_cuentabanco);
        this.router.post('/obtener/:id_cuenta_banco', cuentabancoController.obtenerPorid);
        this.router.post('/Agregarcuentabanco', cuentabancoController.agregar_cuenta_banco);
        this.router.post('/obtenermetodos/:id_metodo_pago_tienda', cuentabancoController.obtenerPoridmetodopago);
    }

}
const cuenta_banco = new CuentaBanRoutes();
export default cuenta_banco.router;