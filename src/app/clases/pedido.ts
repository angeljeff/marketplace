
export class Pedido{
    id_pedido : number
    nombre: string
    cantidadProductos : number
    total : number
    nombreTienda: string
    nombre_estado : string

    constructor(){
       this.id_pedido = 0
       this.cantidadProductos = 0
       this.nombre = ""
       this.nombreTienda = ""
       this.total = 0
       this.nombre_estado = ""
    }
}