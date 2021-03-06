import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './ui/header/header.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { FooterComponent } from './ui/footer/footer.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule } from '@angular/material';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component'
import { NgxMaskModule } from 'ngx-mask';
import { IngredienteListComponent } from './ingrediente/ingrediente-list/ingrediente-list.component';
import { IngredienteFormComponent } from './ingrediente/ingrediente-form/ingrediente-form.component';
import { ReceitaListComponent } from './receita/receita-list/receita-list.component';
import { ReceitaFormComponent } from './receita/receita-form/receita-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    UsuarioListComponent,
    ConfirmDlgComponent,
    UsuarioFormComponent,
    IngredienteListComponent,
    IngredienteFormComponent,
    ReceitaListComponent,
    ReceitaFormComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/    
  ],
  entryComponents: [
    ConfirmDlgComponent
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
