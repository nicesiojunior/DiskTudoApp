import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../_models/Produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  baseURL = 'http://localhost:5000/api/produto';

  constructor(private http: HttpClient) {}
    getProduto() {
      return this.http.get('http://localhost:5000/api/produto');
    }

    getAllProduto(): Observable<Produto[]> {
      return this.http.get<Produto[]>('http://localhost:5000/api/produto');
    }

    getProdutoByName(name: string): Observable<Produto> {
      return this.http.get<Produto>('http://localhost:5000/api/produto/getByName/${name}');
    }

    getProdutoById(id: number): Observable<Produto> {
      return this.http.get<Produto>('http://localhost:5000/api/produto/${id}');
    }


}
