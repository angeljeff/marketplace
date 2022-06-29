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

    public async obtenerPorUsuarioCedulaDTO(req: Request, res: Response): Promise<void> {
        const cedula = req.params.cedula
        const ord = await pool.query(`SELECT orden.id_orden_compra , orden.total, orden.direccion, orden.celular, orden.nombres, orden.cedula_envio, orden.id_estado_pedido, orden.id_metodo_pago_tienda, orden.cedula, estado.nombre_estado, pago.descripcion, ti.nombre_ti, orden.observacion_pedido FROM orden_compra as orden INNER JOIN metodo_pago_tienda as met on orden.id_metodo_pago_tienda = met.id_metodo_pago_tienda INNER JOIN metodo_pago as pago on met.id_metodo_pago = pago.id_metodo_pago INNER JOIN estado_pedido as estado on orden.id_estado_pedido = estado.id_estado_pedido INNER JOIN tiendas as ti ON met.id_tienda = ti.id_tienda where orden.cedula ='${cedula}'`);
        res.send(ord);
    }

    public async obtenerOrdenesPorTienda(req: Request, res: Response): Promise<void> {
        const idTienda = req.params.id_tienda
        const ord = await pool.query(`SELECT orden.id_orden_compra , orden.total, orden.direccion, orden.celular, orden.nombres, orden.cedula_envio, orden.id_estado_pedido, orden.id_metodo_pago_tienda, orden.cedula, estado.nombre_estado, pago.descripcion, ti.nombre_ti, orden.observacion_pedido FROM orden_compra as orden INNER JOIN metodo_pago_tienda as met on orden.id_metodo_pago_tienda = met.id_metodo_pago_tienda INNER JOIN metodo_pago as pago on met.id_metodo_pago = pago.id_metodo_pago INNER JOIN estado_pedido as estado on orden.id_estado_pedido = estado.id_estado_pedido INNER JOIN tiendas as ti ON met.id_tienda = ti.id_tienda where met.id_tienda = '${idTienda}'`);
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

    public async actualizar_estado(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query("UPDATE orden_compra SET  id_estado_pedido = ?, observacion_pedido = ? WHERE id_orden_compra = ?",[req.body.id_estado_pedido, req.body.observacion_pedido, req.params.id_orden_compra]);
        res.json({ message: 'Producto actualizado ' });
        }

    public async actualizar_estado_porsubidadecomprobante(req: Request, res: Response): Promise<void> {
        const agrega_pro = await pool.query("UPDATE orden_compra SET  id_estado_pedido = ? WHERE id_orden_compra = ?",[req.body.id_estado_pedido, req.params.id_orden_compra]);
        res.json({ message: 'Producto actualizado ' });
        }


    public async listarordenesparaestadistica(req: Request, res: Response): Promise<void> {
        const lista_ti_ac = await pool.query('SELECT distinct ord.id_orden_compra, ord.total, p.id_tienda, ti.nombre_ti  FROM orden_compra as ord inner join productos_por_orden as pro on ord.id_orden_compra = pro.id_orden_compra inner join productos as p on pro.id_producto= p.id_producto inner join tiendas as ti on p.id_tienda = ti.id_tienda  where ord.id_estado_pedido = 2 order by p.id_tienda');
        res.send(lista_ti_ac);
    }

   
}

const ordencompraController = new OrdencompraController;
export default ordencompraController;

