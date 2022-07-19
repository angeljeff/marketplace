import { Request, Response } from 'express';
import pool from '../base_datos';

class ComentarioTiendaController {
    public async agregar_comentario(req: Request, res: Response): Promise<void> {
        //const agregar =  await pool.query(`INSERT INTO usuarios (cedula, id_tipo_usuario, id_cantones, nombres, apelllidos, direccion, fecha_nacimiento, genero, correo, contraseña) VALUES ('${numero}', '${id1}', '${id2}', '${nombre}', '${nombre}', '${nombre}', '${fecha}', '${nombre}', '${nombre}','${nombre}')`);
        const agrega_producto = await pool.query('INSERT INTO comentarios_tiendas set  ? ', [req.body]);
        res.json({ message: 'Comentario agregada' });
    }

    public async listar_comentarios(req: Request, res: Response): Promise<void> {
        const lista_comentarios = await pool.query('SELECT * FROM comentarios_tiendas');
        res.send(lista_comentarios);
    }

    public async obtenerPorTienda(req: Request, res: Response): Promise<void> {
        const id_tienda = req.params.id_tienda
        const usuario = await pool.query(`SELECT com.*, usu.nombres, usu.apellidos FROM comentarios_tiendas as com inner join usuarios as usu on com.cedula=usu.cedula where com.id_tienda ='${id_tienda}'`);
        res.send(usuario);
    }
/* 
    public async listartiendasActivas(req: Request, res: Response): Promise<void> {
        const lista_ti_ac = await pool.query('SELECT * FROM tiendas where id_estado_tienda = 1');
        res.send(lista_ti_ac);
    }

    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const tienda = req.params.id_tienda
        const tiend = await pool.query(`SELECT * FROM tiendas where id_tienda ='${tienda}'`);
        res.send(tiend);
    }

    public async obtenerPorcedula(req: Request, res: Response): Promise<void> {
        const tiendas = req.params.cedula
        const tiendaa = await pool.query(`SELECT * FROM tiendas where cedula ='${tiendas}'`);
        res.send(tiendaa);
    }

    public async actualizar_contador(req: Request, res: Response): Promise<void> {
        console.log(req.body.contador)
        console.log(req.params.id_tienda +"tienda")
        await pool.query("UPDATE tiendas SET contador= ? WHERE id_tienda = ?", [req.body.contador ,  req.params.id_tienda]);
        res.json({ message: 'Tienda actualizada' });
    }

    public async actualizar_datos_tienda(req: Request, res: Response): Promise<void> {
        const actualiza_tienda = await pool.query("UPDATE tiendas SET  nombre_ti= ?, direccion = ? , correo_electronico = ? , hora_apertura = ?, hora_cierre = ?, descripcion = ?, telefono = ? , valor_envio = ?, id_cantones = ? WHERE id_tienda = ?",
        [req.body.nombre_ti, req.body.direccion,  req.body.correo_electronico,  req.body.hora_apertura ,  req.body.hora_cierre,  req.body.descripcion,  req.body.telefono, req.body.valor_envio, req.body.id_cantones, req.params.id_tienda]);
        res.json({ message: 'tienda actualizada' });
    }

    public async desactivar_tienda(req: Request, res: Response): Promise<void> {
        const desactiva_tiendao = await pool.query("UPDATE tiendas SET  id_estado_tienda=2 WHERE id_tienda = ?",[ req.params.id_tienda]);
        res.json({ message: 'tienda eliminada' });
    }

    public async activar_teinda(req: Request, res: Response): Promise<void> {
        const activa_tienda = await pool.query("UPDATE tiendas SET id_estado_tienda=1 WHERE id_tienda = ?",[ req.params.id_tienda]);
        res.json({ message: 'tienda activada' });
    } */

   
}

const comentariostiendaController = new ComentarioTiendaController;
export default comentariostiendaController;
