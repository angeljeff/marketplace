
export class ProductosPorOrden{
    id_producto_orden : number
    id_orden_compra: number
    id_producto: number
    cantidad: number
    precio_producto: number
    total_producto: number
    

    constructor(){
       this.id_producto_orden = 0
       this.id_orden_compra = 0
       this.id_producto = 0
       this.cantidad = 0
       this.precio_producto = 0
       this.total_producto = 0
    }
}


export class ProductosPorOrdenDTO{
    id_producto_orden : number
    id_orden_compra: number
    id_tienda: number
    id_producto: number
    nombre: string
    imagen: string
    cantidad: number
    precio_producto: number
    total_producto: number
    

    constructor(){
       this.id_producto_orden = 0
       this.id_orden_compra = 0
       this.id_producto = 0
       this.id_tienda = 0
       this.cantidad = 0
       this.precio_producto = 0
       this.total_producto = 0
       this.nombre = ""
       this.imagen = ""
    }
}