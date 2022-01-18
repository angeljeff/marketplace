import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { Pagina2Component } from './paginas/pagina2/pagina2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxAutocompleteModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxGalleryModule, DxLoadIndicatorModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { UsuarioVendedorComponent } from './paginas/usuario-vendedor/usuario-vendedor.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegisterComponent } from './paginas/register/register.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SeccionTiendaComponent } from './paginas/usuario-vendedor/seccion-tienda/seccion-tienda.component';
import { SeccionProductoComponent } from './paginas/usuario-vendedor/seccion-producto/seccion-producto.component';
import { OrdenesVendedorComponent } from './paginas/usuario-vendedor/ordenes-vendedor/ordenes-vendedor.component';
import { LoadingComponent } from './paginas/shared/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { SeccionPagoComponent } from './paginas/usuario-vendedor/seccion-pago/seccion-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    Pagina2Component,
    UsuarioVendedorComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    SeccionTiendaComponent,
    SeccionProductoComponent,
    OrdenesVendedorComponent,
    LoadingComponent,
    SeccionPagoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DxButtonModule,
    DxMenuModule,
    DxGalleryModule,
    DxAutocompleteModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxNumberBoxModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxCheckBoxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
