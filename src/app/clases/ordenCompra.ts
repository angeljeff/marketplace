
export class OrdenCompra{
    id_orden_compra : number
    id_estado_pedido: number
    id_metodo_pago_tienda: number
    total: number
    direccion: string
    celular: string
    nombres: string
    cedula_envio: string
    cedula: string
    observacion_pedido:string
    fecha_orden:Date

    constructor(){
       this.id_orden_compra = 0
       this.id_estado_pedido = 0
       this.id_metodo_pago_tienda = 0
       this.direccion = ""
       this.celular = ""
       this.nombres = ""
       this.cedula_envio = "0"
       this.cedula = ""
       this.total = 0
       this.observacion_pedido= ""
       this.fecha_orden=new Date()
      
    }
}

export class OrdenCompraDto{
    id_orden_compra : number
    id_estado_pedido: number
    id_metodo_pago_tienda: number
    total: number
    direccion: string
    celular: string
    nombres: string
    cedula_envio: string
    cedula: string
    nombre_estado : string
    descripcion : string
    observacion_pedido:string
    nombre_ti:string
    fecha_orden:Date

    constructor(){
       this.id_orden_compra = 0
       this.id_estado_pedido = 0
       this.id_metodo_pago_tienda = 0
       this.direccion = ""
       this.celular = "0"
       this.nombres = ""
       this.cedula_envio = "0"
       this.nombre_estado = ""
       this.descripcion = ""
       this.cedula = ""
       this.total = 0
       this.observacion_pedido= ""
       this.nombre_ti=""
       this.fecha_orden=new Date()
       
      
    }
}

export class OrdenCompraEsta{
    id_orden_compra : number
    total:number
    id_tienda:number
    nombre_ti:string
    
   


    constructor(){
       this.id_orden_compra = 0
       this.total=0
       this.id_tienda=0
       this.nombre_ti=""
      
      
    }
}