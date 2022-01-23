
export class OrdenTemporal{
    id_orden : number
    id_producto: number
    nombre_producto : string
    cantidad : number
    precio: number
    imagen: string
    total: number

    constructor(){
       this.id_orden = 0
       this.id_producto = 0
       this.nombre_producto = ""
       this.cantidad = 0
       this.precio = 0
       this.imagen = ""
       this.total = 0
      
    }
}