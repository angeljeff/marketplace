import { Request, Response } from 'express';
import pool from '../base_datos';

class OrdencompraController {
  

    public async listar_orden_compra(req: Request, res: Response): Promise<void> {
        const lista_orden = await pool.query('SELECT * FROM orden_compra');
        res.send(lista_orden);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const orden = req.params.id_orden_compra
        const ord = await pool.query(`SELECT * FROM orden_compra where id_orden_compra ='${orden}'`);
        res.send(ord);
    }

    public async obtenerPorUsuarioCedula(req: Request, res: Response): Promise<void> {
        const cedula = req.params.cedula
        const ord = await pool.query(`SELECT * FROM orden_compra where id_estado_pedido = 1 AND cedula ='${cedula}'`);
        res.send(ord);
    }


    public async agregar_orden_compra(req: Request, res: Response): Promise<void> {
        const nuevaOrden = await pool.query('INSERT INTO orden_compra set  ? ', [req.body]);
        res.send(nuevaOrden);
    }


    public async actualizar_orden_compra(req: Request, res: Response): Promise<void> {
    const agrega_pro = await pool.query("UPDATE orden_compra SET  total = ?, direccion= ?, celular= ?, nombres= ?, cedula_envio= ?, id_metodo_pago_tienda = ?, id_estado_pedido = ? WHERE id_orden_compra = ?",
    [req.body.total, req.body.direccion ,req.body.celular, req.body.nombres,req.body.cedula_envio,req.body.id_metodo_pago_tienda, req.body.id_estado_pedido, req.params.id_orden_compra]);
    res.json({ message: 'Producto actualizado ' });
    }

   
}

const ordencompraController = new OrdencompraController;
export default ordencompraController;

