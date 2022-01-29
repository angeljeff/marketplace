
export class PagoPorOrden{
    id_pago_por_orden : number
    id_orden_compra: number
    imagen_comprobante: string

    constructor(){
       this.id_orden_compra = 0
       this.id_pago_por_orden = 0
       this.imagen_comprobante = ""
      
    }
}