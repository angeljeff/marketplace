
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


export class VentasPrediccion{
    fecha : Date
    total : number
    
    constructor(){
       this.fecha = new Date()
       this.total=0

    }
}

export class VentasPrediccionString{
    fecha : string
    total : number
    
    constructor(){
       this.fecha = ""
       this.total=0

    }
}