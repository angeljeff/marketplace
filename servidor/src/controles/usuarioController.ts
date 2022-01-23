import { Request, Response } from 'express';
import pool from '../base_datos';
const jwt = require('jsonwebtoken');

class UsuarioControl {
    public async crear(req: Request, res: Response): Promise<void> {
        //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
        const agrega_usuario = await pool.query('INSERT INTO usuarios set  ? ', [req.body]);
        res.json({ message: 'Usuario registrado' });
    }

    public async listar(req: Request, res: Response): Promise<void> {
        const lista = await pool.query('SELECT * FROM usuarios');
        res.send(lista);
    }

    public async listarUsuariosActivos(req: Request, res: Response): Promise<void> {
        const lista = await pool.query('SELECT * FROM usuarios where Activo = 1');
        res.send(lista);
    }

    public async obtenerPorCedula(req: Request, res: Response): Promise<void> {
        const cedula = req.params.cedula
        const usuario = await pool.query(`SELECT * FROM usuarios where cedula ='${cedula}'`);
        res.send(usuario);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const agrega_usuario = await pool.query("UPDATE usuarios SET  correo= ?, contrasenia = ?, celular = ?, direccion = ? WHERE cedula = ?",
        [req.body.correo, req.body.contraseña, req.body.celular, req.body.direccion, req.params.cedula]);
        res.json({ message: 'Usuario ACTUALIZADO' });
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const usuario = await pool.query("UPDATE usuarios SET  Activo = 0 WHERE cedula = ?",[ req.params.cedula]);
        res.json({ message: 'Usuario ELIMINADO' });
    }

    public async login(req: Request, res: Response):Promise<any>{
        const usuario = await pool.query("SELECT * from usuarios WHERE cedula = ? AND contrasenia = ?",[ req.body.cedula, req.body.contrasenia]);
        if (usuario.length == 0) 
            return res.status(401).send('Usuario o Contraseña Incorrecta');

        const token = jwt.sign({ cedula: usuario.cedula }, 'secretkey');
        return res.status(200).json({ token });
       
    }
   
}

const control_usu = new UsuarioControl;
export default control_usu;


/*
{
    "cedula":"1111111", 
    "id_tipo_usuario":11, 
    "id_cantones":2,
    "nombres":"heffferso",
    "apelllidos":"vv vvv",
    "direccion":"guasmo norte",
    "fecha_nacimiento":"10/12/12",
    "genero":"maculon",
    "correo":"112222",
    "contraseña":"fdfdgddd" 
}*/