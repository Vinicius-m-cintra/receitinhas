import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../receita.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-receita-list',
  templateUrl: './receita-list.component.html',
  styleUrls: ['./receita-list.component.scss']
})
export class ReceitaListComponent implements OnInit {

  constructor(
    private receitaSrv: ReceitaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  receitas: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'tempo', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.receitas = await this.receitaSrv.listar();
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
        data: { question: 'Deseja realmente excluir este receita?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.receitaSrv.excluir(id);
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
