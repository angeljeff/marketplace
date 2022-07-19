import { Request, Response } from 'express';
import pool from '../base_datos';

class CuentabancoController {
  

    public async listar_cuentabanco(req: Request, res: Response): Promise<void> {
        const lista_cuentas = await pool.query('SELECT * FROM datos_cuentas_bancaria');
        res.send(lista_cuentas);
    }


    public async obtenerPorid(req: Request, res: Response): Promise<void> {
        const cuenta = req.params.id_cuenta_banco
        const cuen = await pool.query(`SELECT * FROM datos_cuentas_bancaria where id_cuenta_banco ='${cuenta}'`);
        res.send(cuen);
    }

    public async obtenerPoridmetodopago(req: Request, res: Response): Promise<void> {
        const cuenta = req.params.id_metodo_pago_tienda
        const cuen = await pool.query(`SELECT dato.tipo_cuenta, dato.numero_cuenta,dato.titular_cuenta, dato.cedula_titular, dato.activacion, bn.descripcion FROM datos_cuentas_bancaria as dato INNER JOIN bancos as bn on dato.id_banco = bn.id_banco where dato.activacion=1 and id_metodo_pago_tienda ='${cuenta}'`);
        res.send(cuen);
    }
    public async obtenerPoridmetodopagotodos(req: Request, res: Response): Promise<void> {
        const cuenta = req.params.id_metodo_pago_tienda
        const cuen = await pool.query(`SELECT dato.tipo_cuenta, dato.numero_cuenta,dato.titular_cuenta, dato.cedula_titular, dato.activacion, bn.descripcion, dato.id_cuenta_banco FROM datos_cuentas_bancaria as dato INNER JOIN bancos as bn on dato.id_banco = bn.id_banco where id_metodo_pago_tienda ='${cuenta}'`);
        res.send(cuen);
    }


    public async agregar_cuenta_banco(req: Request, res: Response): Promise<void> {
        const agrega_cuenta = await pool.query('INSERT INTO datos_cuentas_bancaria set  ? ', [req.body]);
        res.json({ message: 'cuenta bancaria agregada ' });
    }


    public async actualizarestado(req: Request, res: Response): Promise<void> {
        console.log("este es el activa"+req.body.activacion)
        const agrega_producto = await pool.query("UPDATE datos_cuentas_bancaria SET activacion = ? WHERE id_cuenta_banco = ?",
        [ req.body.activacion ,req.params.id_cuenta_banco]);
        res.json({ message: 'Producto actualizado ' });
    }




   
}

const cuentabancoController = new CuentabancoController;
export default cuentabancoController;

