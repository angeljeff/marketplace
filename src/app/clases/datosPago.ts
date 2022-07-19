
export class DatosPago{
    id_cuenta_banco:string
    cedula_titular:string;
    titular_cuenta: string;
    id_banco: number;
    numero_cuenta:string;
    tipo_cuenta: string;
    id_metodo_pago_tienda:number
    activacion:number

   
    constructor(){
       this.titular_cuenta = ""
       this.id_banco = 0
       this.cedula_titular = ""
       this.numero_cuenta = ""
       this.tipo_cuenta = ""
       this.id_metodo_pago_tienda=0
       this.id_cuenta_banco=""
       this.activacion=1

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
    descripcion: string
    activacion:number

   
    constructor(){
       this.titular_cuenta = ""
       this.id_banco = 0
       this.cedula_titular = ""
       this.numero_cuenta = ""
       this.tipo_cuenta = ""
       this.id_metodo_pago_tienda=0
       this.id_cuenta_banco=""
       this.descripcion=""
       this.activacion=1

    }
}