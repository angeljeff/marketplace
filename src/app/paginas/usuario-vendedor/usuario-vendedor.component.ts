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

  


  constructor(private router: Router) { }

  ngOnInit(): void {

    // Crear un metodo para traer la tienda asociada al usuario si no tiene tienda setear la variable idNewTienda en true, sino en false
  }


  click(e:any){

  }

  registrar(){

  }

  editarPerfil(){
    this.router.navigate(['/register'], { queryParams: { id: "0995553816" } });
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
