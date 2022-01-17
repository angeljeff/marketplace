import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { Pagina2Component } from './paginas/pagina2/pagina2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxAutocompleteModule, DxButtonModule, DxDataGridModule, DxGalleryModule, DxMenuModule, DxNumberBoxModule, DxTextBoxModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { UsuarioVendedorComponent } from './paginas/usuario-vendedor/usuario-vendedor.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegisterComponent } from './paginas/register/register.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    Pagina2Component,
    UsuarioVendedorComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent
  ],
  imports: [
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
    DxDataGridModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
