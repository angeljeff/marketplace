
export class DatosPago{
    id_cuenta_banco:string
    cedula_titular:string;
    titular_cuenta: string;
    id_banco: number;
    numeroCuenta:string;
    tipoCuenta: string;
    id_metodo_pago_tienda:number

   
    constructor(){
       this.titular_cuenta = ""
       this.id_banco = 0
       this.cedula_titular = ""
       this.numeroCuenta = ""
       this.tipoCuenta = ""
       this.id_metodo_pago_tienda=0
       this.id_cuenta_banco=""

    }
}