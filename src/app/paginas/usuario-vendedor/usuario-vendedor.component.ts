import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-usuario-vendedor',
  templateUrl: './usuario-vendedor.component.html',
  styleUrls: ['./usuario-vendedor.component.css']
})
export class UsuarioVendedorComponent implements OnInit {

  seccionOrdenes = true;
  seccionProducto = false;
  seccionTienda = false;
  seccionPago = false;

  seeccionNewProducto = false;
  seccionListProducto = true;

  usuarioNuevo: Usuario = new Usuario();



  productos: Producto[] = [{
  ID: 1,
  Nombre: 'Producto1',
  Cantidad: 10,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
 
}, {
  ID: 10,
  Nombre: 'Producto2',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto3',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto4',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto5',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}];



  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  click(e:any){

  }

  registrar(){

  }

  editarPerfil(){
    this.router.navigate(['/register'], { queryParams: { id: "0995553816" } });
  }

  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seeccionNewProducto = false;
      this.seccionListProducto = true;
    }
      
    else if(numero = 2){
      this.seeccionNewProducto = true;
      this.seccionListProducto = false;
    }


  }


  mostrarSeccion(numero : number){
    switch (numero) {
      case 1:
        this.seccionOrdenes = true;
        this.seccionProducto = false;
        this.seccionTienda = false;
        this.seccionPago = false;
       break;
      case 2:
        this.seccionOrdenes = false;
        this.seccionProducto = true;
        this.seccionTienda = false;
        this.seccionPago = false;
        break;
      case 3:
        this.seccionOrdenes = false;
        this.seccionProducto = false;
        this.seccionTienda = true;
        this.seccionPago = false;
        break;
      case 4:
        this.seccionOrdenes = false;
        this.seccionProducto = false;
        this.seccionTienda = false;
        this.seccionPago = true;
        break;
      default:    
    }  
    

  }
}

export class Producto {
  ID: number;
  Nombre: string;
  Cantidad: number;
  Estado: string;
  Descripcion: string;
  Picture : string;
  constructor(){
    this.ID = 0;
    this.Nombre = "";
    this.Cantidad = 0;
    this.Estado = "";
    this.Descripcion = "";
    this.Picture = "";
  }
}
