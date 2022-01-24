import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { Pagina2Component } from './paginas/pagina2/pagina2.component';
import { UsuarioVendedorComponent } from './paginas/usuario-vendedor/usuario-vendedor.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { RegisterComponent } from './paginas/register/register.component';
import { AuthGuardService } from './services/auth.service';
import { CarritoComprasComponent } from './paginas/carrito-compras/carrito-compras.component';
import { ProductosTiendaComponent } from './paginas/productos-tienda/productos-tienda.component';

const routes: Routes = [
        { 
          path:'principal', 
          component: PrincipalComponent,
          canActivate: [AuthGuardService],
        },
        { 
          path:'usuarioVendedor', 
          component: UsuarioVendedorComponent,
          canActivate: [AuthGuardService],
        },
        { 
          path:'menu', 
          component: MenuComponent,
          canActivate: [AuthGuardService],
        },
        { 
          path:'pagina', 
          component: Pagina2Component,
          canActivate: [AuthGuardService],
        },
        { 
          path:'login', 
          component: LoginComponent,
          canActivate: [AuthGuardService],
        },
        { 
          path:'register', 
          component: RegisterComponent,
          canActivate: [AuthGuardService],
        },
         {
          path:'carrito-compras', 
          component: CarritoComprasComponent,
          canActivate: [AuthGuardService],
        },{
          path:'productos-tienda', 
          component: ProductosTiendaComponent,
          canActivate: [AuthGuardService],
        },
        {
          path: "**",
          redirectTo: "principal",
        },
        
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
