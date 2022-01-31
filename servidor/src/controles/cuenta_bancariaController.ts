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
        const cuen = await pool.query(`SELECT dato.tipo_cuenta, dato.numero_cuenta,dato.titular_cuenta, dato.cedula_titular, bn.descripcion FROM datos_cuentas_bancaria as dato INNER JOIN bancos as bn on dato.id_banco = bn.id_banco where id_metodo_pago_tienda ='${cuenta}'`);
        res.send(cuen);
    }


    public async agregar_cuenta_banco(req: Request, res: Response): Promise<void> {
        const agrega_cuenta = await pool.query('INSERT INTO datos_cuentas_bancaria set  ? ', [req.body]);
        res.json({ message: 'cuenta bancaria agregada ' });
    }


   
}

const cuentabancoController = new CuentabancoController;
export default cuentabancoController;

