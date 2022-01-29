
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

    constructor(){
       this.id_orden_compra = 0
       this.id_estado_pedido = 0
       this.id_metodo_pago_tienda = 0
       this.direccion = ""
       this.celular = ""
       this.nombres = ""
       this.cedula_envio = ""
       this.cedula = ""
       this.total = 0
      
    }
}