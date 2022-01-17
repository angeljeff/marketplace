import { Request, Response } from 'express';
import pool from '../base_datos';

class UsuarioControl {
    public async crear(req: Request, res: Response): Promise<void> {
        //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
        const agrega_usuario = await pool.query('INSERT INTO usuarios set  ? ', [req.body]);
        res.json({ message: 'Game Sabbbbbb' });
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
        const agrega_usuario = await pool.query("UPDATE usuarios SET  nombres= ?, apelllidos = ? WHERE cedula = ?",
        [req.body.nombres, req.body.apelllidos,  req.params.cedula]);
        res.json({ message: 'Usuario ACTUALIZADO' });
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const usuario = await pool.query("UPDATE usuarios SET  Activo = 0 WHERE cedula = ?",[ req.params.cedula]);
        res.json({ message: 'Usuario ELIMINADO' });
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