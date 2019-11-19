import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../ingrediente.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ingrediente-list',
  templateUrl: './ingrediente-list.component.html',
  styleUrls: ['./ingrediente-list.component.scss']
})
export class IngredienteListComponent implements OnInit {

  constructor(
    private ingredienteSrv: IngredienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ingredientes: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.ingredientes = await this.ingredienteSrv.listar();
    }
    catch(error) {
      console.error(error);
    }
  
  }

  async excluir(id: string) {
    try {

      // Exibição da caixa de diálogo de confirmação
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Deseja realmente excluir este ingrediente?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.ingredienteSrv.excluir(id);
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi',
          { duration: 3000 });
        this.ngOnInit(); // Atualizar os dados
      }      

    }
    catch(erro) {
      console.log(erro);
      this.snackBar.open('ERRO: não foi possível excluir. Contate o suporte técnico',
       'Entendi', { duration: 3000 });
    }
  }

}
