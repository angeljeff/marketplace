
export class Ventas{
    id_venta : number
    fecha: Date
    id_orden_compra : number
    
    constructor(){
       this.id_venta = 0
       this.id_orden_compra = 0
       this.fecha = new Date()

    }
}