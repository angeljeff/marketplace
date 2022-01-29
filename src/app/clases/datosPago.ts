
export class DatosPago{
    id_cuenta_banco:string
    cedula_titular:string;
    titular_cuenta: string;
    id_banco: number;
    numero_cuenta:string;
    tipo_cuenta: string;
    id_metodo_pago_tienda:number

   
    constructor(){
       this.titular_cuenta = ""
       this.id_banco = 0
       this.cedula_titular = ""
       this.numero_cuenta = ""
       this.tipo_cuenta = ""
       this.id_metodo_pago_tienda=0
       this.id_cuenta_banco=""

    }
}

export class DatosPagopresentacion{
    id_cuenta_banco:string
    cedula_titular:string;
    titular_cuenta: string;
    id_banco: number;
    numero_cuenta:string;
    tipo_cuenta: string;
    id_metodo_pago_tienda:number
    nombre_banco: string

   
    constructor(){
       this.titular_cuenta = ""
       this.id_banco = 0
       this.cedula_titular = ""
       this.numero_cuenta = ""
       this.tipo_cuenta = ""
       this.id_metodo_pago_tienda=0
       this.id_cuenta_banco=""
       this.nombre_banco=""

    }
}