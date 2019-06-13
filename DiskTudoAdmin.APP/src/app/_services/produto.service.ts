import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../_models/Produto';
import { Observable } from 'rxjs';
import { Categoria } from '../_models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  registerProduto(produto: Produto[]) {
    return this.http.post('http://localhost:5000/api/produto/', produto);
  }
  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:5000/api/categoria');
  }

}

