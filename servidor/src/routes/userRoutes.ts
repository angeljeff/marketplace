import { Router } from 'express';
import control_usu from '../controles/usuarioController';
class ControlUsuario {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/listar', control_usu.listar);
        this.router.get('/listarAdministradores', control_usu.listarAdministradores);
        this.router.get('/listarClientes', control_usu.listarClientes);
        this.router.get('/listarPropietariosdenegocios', control_usu.listarPropietariosdenegocios);
        this.router.get('/listarActivos', control_usu.listarUsuariosActivos);
        this.router.post('/obtener/:cedula', control_usu.obtenerPorCedula);
        this.router.post('/create', control_usu.crear);
        this.router.post('/login', control_usu.login);
        this.router.post('/obtenerporcorreoyced', control_usu.obtenerPorCedulaycorreo);
        this.router.post('/obtenerporcorreoycedactualizar', control_usu.obtenerPorCedulaycorreoactualizar);
        this.router.put('/update/:cedula', control_usu.actualizar);
        this.router.put('/update_cont/:cedula', control_usu.actualizarcontrasenia);
        this.router.put('/eliminar/:cedula', control_usu.eliminar);

       
    }

}
const usuario = new ControlUsuario();
export default usuario.router;