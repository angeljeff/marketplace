import { Router } from 'express';

import bancoController from '../controles/BancoController';
class BancoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', bancoController.listar_bancos);
        this.router.get('/obtener/:id_banco', bancoController.obtenerPorid);
       
    }

}
const banco = new BancoRoutes();
export default banco.router;