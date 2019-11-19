import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { IngredienteFormComponent } from './ingrediente/ingrediente-form/ingrediente-form.component';
import { IngredienteListComponent } from './ingrediente/ingrediente-list/ingrediente-list.component';
// import { ReceitaFormComponent } from './receita/receita-form/receita-form.component';
import { ReceitaListComponent } from './receita/receita-list/receita-list.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioFormComponent },

  { path: 'ingredientes', component: IngredienteListComponent },
  { path: 'ingredientes/novo', component: IngredienteFormComponent },
  { path: 'ingredientes/:id', component: IngredienteFormComponent },

  { path: 'receita', component: ReceitaListComponent },
  // { path: 'receita/novo', component: ReceitaFormComponent },
  // { path: 'receita/:id', component: ReceitaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
