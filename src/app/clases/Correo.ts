export class Correo{
    email : string
    mensaje: string
    asunto: string

    constructor(){
       
       this.email = ""
       this.mensaje = ""
       this.asunto = ""
      
    }
}

export class CorreoPedido{
    email : string
    mensaje: string
    asunto: string
    fecha:string

    constructor(){
       
       this.email = ""
       this.mensaje = ""
       this.asunto = ""
       this.fecha=""
    }
}

export class CorreoStock{
    email : string
    nombre: string
    cantidad: string
    email_cliente: string
    celular_cliente:string
    nombre_producto: string
    asunto: string
    fecha:string
    apellidos:string

    constructor(){
       
       this.email = ""
       this.nombre_producto = ""
       this.asunto = ""
       this.fecha=""
       this.nombre=""
       this.cantidad=""
       this.email_cliente=""
       this.celular_cliente=""
       this.apellidos=""
    }
}