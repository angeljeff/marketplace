import { Router } from 'express';

import tipousuController from '../controles/tipoUsuarioController';
class TipousuRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', tipousuController.listar_tipos_usuarios);
        this.router.get('/obtener/:id_tipo_usuario', tipousuController.obtenerPorid);
       
    }

}
const tipo_usuario = new TipousuRoutes();
export default tipo_usuario.router;