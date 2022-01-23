
export class Producto{
    id_producto:string;
    nombre: string;
    precio: number;
    imagen: string;
    stock: number;
    descripcion:string;
    contador:number;
    id_sub_categoria: number;
    id_tienda: number;
    id_estado_pro:number;

   
    constructor(){
       this.id_producto = ""
       this.nombre = ""
       this.precio = 0.0
       this.stock= 0
       this.contador = 0
       this.descripcion = ""
       this.id_sub_categoria=1
       this.id_tienda= 2
       this.id_estado_pro= 1
       this.imagen= "https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png"

    }
}


export class Productodto{
    id_producto:string;
    nombre: string;
    precio: number;
    imagen: string;
    stock: number;
    descripcion:string;
    contador:number;
    id_sub_categoria: number;
    id_tienda: number;
    id_estado_pro:number;
    nombre_estado:string;
   
    constructor(){
       this.id_producto = ""
       this.nombre = ""
       this.precio = 0
       this.stock= 0
       this.contador = 0
       this.descripcion = ""
       this.id_sub_categoria=1
       this.id_tienda= 1
       this.id_estado_pro= 1
       this.nombre_estado=""
       this.imagen= "https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png"

    }
}

   


export class Productoreserva{
    precio: string;
    constructor(){ 
       this.precio = ""
      

    }
}