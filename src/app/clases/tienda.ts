
export class Tienda{
    id_tienda: string;
    nombre: string
    direccion: string
    correo_electronico: string
    telefono: string 
    hora_apertura: Date 
    hora_cierre: Date
    descripcion : string
    contador: number
    id_cantones: number;
    id_estado_tienda: number;
    cedula: string;
    constructor(){
       this.nombre = ""
       this.direccion = ""
       this.telefono = ""
       this.hora_apertura = new Date()
       this.hora_cierre = new Date()
       this.descripcion = ""
       this.correo_electronico = ""
       this.id_tienda=""
       this.contador=0
       this.id_cantones=0
       this.id_estado_tienda=1
       this.cedula="24245"

    }
}