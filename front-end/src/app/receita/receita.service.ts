import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private http: HttpClient) { }

  private endPoint : string = 'receita';

  listar() {
    return this.http.get(env.apiUri + this.endPoint).toPromise();
  }

  excluir(id: string){
    return this.http.request('delete', env.apiUri + this.endPoint,
    { body: {_id: id}}).toPromise();
  }

  novo(receita: any) {
    return this.http.post(env.apiUri + this.endPoint, receita).toPromise();
  }

  obterUm(id: string){
    return this.http.get(env.apiUri + this.endPoint + '/' + id).toPromise();
  }

  atualizar(receita: any){
    return this.http.put(env.apiUri + this.endPoint, receita).toPromise();
  }
}
