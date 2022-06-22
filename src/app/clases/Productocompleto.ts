
export class Productocompleto{
    id_producto:number;
    nombre: string;
    precio: number;
    imagen: string;
    stock: number;
    descripcion:string;
    contador:number;
    id_sub_categoria: number;
    descripcion_sub: string
    id_categoria: number
    descripcion_cat:string
    id_tienda: number;
    id_estado_pro:number;
    nombre_ti:string;
    estado:number;
    comen_aprobacion: string;
    unidades_vendidades:number;
   

   
    constructor(){
       this.id_producto = 0
       this.nombre = ""
       this.precio = 0.0
       this.stock= 0
       this.contador = 0
       this.descripcion = ""
       this.id_sub_categoria=1
       this.id_tienda= 2
       this.id_estado_pro= 1
       this.descripcion_sub=""
       this.id_categoria=0
       this.estado=1
       this.descripcion_cat=""
       this.nombre_ti=""
       this.comen_aprobacion= ""
       this.unidades_vendidades=0
       this.imagen= "https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png"

    }
}

