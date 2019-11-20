import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ReceitaService } from '../receita.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { IngredienteService } from '../../ingrediente/ingrediente.service';

@Component({
  selector: 'app-receita-form',
  templateUrl: './receita-form.component.html',
  styleUrls: ['./receita-form.component.scss']
})
export class ReceitaFormComponent implements OnInit {

  constructor(
    private receitaSrv: ReceitaService,
    private usuarioSrv: UsuarioService,
    private ingredienteSrv: IngredienteService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo receita';
  receita: any = {};
  usuarios: any = [];
  ingredientes: any = [];
  ingredientesSelecionados: any = [];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do receita e preenche a variável ligada ao form
        this.receita = await this.receitaSrv.obterUm(params['id']);
        this.title = 'Editando receita';
      }
      catch(error) {
        console.log(error);
      }
    }

    try{
      this.usuarios = await this.usuarioSrv.listar();
      this.ingredientes = await this.ingredienteSrv.listar();
    }
    catch(error){
      console.log(error)
    }

  }

  setSelected(selectElement){
    this.ingredientesSelecionados = selectElement.value;
  }

  async salvar(form: NgForm) {
    this.receita.ingredientes = this.ingredientesSelecionados
    if(form.valid) {
      try {
        let msg = 'Ingrediente criado com sucesso.';
        
        if(this.receita._id) { // Se tem _id, está editando
          msg = 'Ingrediente atualizado com sucesso';
          await this.receitaSrv.atualizar(this.receita);
        }
        else { // Criação de um novo receita
          await this.receitaSrv.novo(this.receita);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/receitas']); // Volta à listagem
      }
      catch(error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          {duration: 3000});
      }
    }
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/receitas']); // Retorna à listagem
    }

  }

}
