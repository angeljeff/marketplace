
export class Usuario{
    cedula:string;
    nombres: string;
    apellidos: string;
    direccion:string;
    fecha_nacimiento: Date;
    id_cantones: number
    celular: string;
    genero:string;
    correo: string 
    contrasenia: string
    id_tipo_usuario: number
   
    constructor(){
       this.nombres = ""
       this.apellidos = ""
       this.cedula = ""
       this.id_cantones= 0
       this.correo = ""
       this.contrasenia = ""
       this.direccion=""
       this.fecha_nacimiento= new Date()
       this.celular= ""
       this.genero= ""
       
       this.id_tipo_usuario=0

    }
}
export class UsuarioTienda{
    cedula:string;
    nombres: string;
    apellidos: string;
    direccion:string;
    fecha_nacimiento: Date;
    id_cantones: number
    celular: string;
    genero:string;
    correo: string 
    contrasenia: string
    id_tipo_usuario: number
    nombre_ti: string
   
    constructor(){
       this.nombres = ""
       this.apellidos = ""
       this.cedula = ""
       this.id_cantones= 0
       this.correo = ""
       this.contrasenia = ""
       this.direccion=""
       this.fecha_nacimiento= new Date()
       this.celular= ""
       this.genero= ""
       this.nombre_ti=""
       
       this.id_tipo_usuario=0

    }
}

export class UserLogin{
    cedula:number;
    contrasenia: string
    constructor(){
       this.cedula = 0
       this.contrasenia = ""
    }
}