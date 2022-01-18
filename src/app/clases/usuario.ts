
export class Usuario{
    cedula:string;
    nombres: string;
    apellidos: string;
    direccion:string;
    fecha_nacimiento: Date;
    id_cantones: number
    celular: number;
    genero:string;
    correo: string 
    contrasenia: string
    id_tipo_usuario: number
   
    constructor(){
       this.nombres = ""
       this.apellidos = ""
       this.cedula = ""
       this.id_cantones=2
       this.correo = ""
       this.contrasenia = ""
       this.direccion=""
       this.fecha_nacimiento= new Date()
       this.celular= 0
       this.genero= ""
       
       this.id_tipo_usuario=1

    }
}