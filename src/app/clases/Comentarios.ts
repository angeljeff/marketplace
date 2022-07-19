
export class Comentarios{
    id_comentario_ti:number
    comentario:string;
    fecha: string;
    cedula: string;
    id_tienda:string;
    puntuacion:number;

   
    constructor(){
       this.id_comentario_ti=0
       this.comentario = ""
       this.fecha = ""
       this.cedula = ""
       this.id_tienda = ""
       this.puntuacion=0
    }
}


export class ComentariosDTO{
    id_comentario_ti:number
    comentario:string;
    fecha: string;
    cedula: string;
    id_tienda:string;
    nombres:string;
    apellidos:string;
    puntuacion:number;

   
    constructor(){
       this.id_comentario_ti=0
       this.comentario = ""
       this.fecha = ""
       this.cedula = ""
       this.id_tienda = ""
       this.nombres= ""
       this.apellidos= ""
       this.puntuacion=0
    }
}