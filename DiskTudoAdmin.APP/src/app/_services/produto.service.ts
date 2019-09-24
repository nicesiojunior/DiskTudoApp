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

  registerProduto(produto: Produto) {
    return this.http.post('http://localhost:5000/api/produto/', produto);
  }

  postUpload(file: File) {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const fileToUpload = <File> file[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post('http://localhost:5000/api/produto/upload', formData);
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>('http://localhost:5000/api/produto/' + id);
  }

  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:5000/api/produto');
  }

  putProduto(produto: Produto) {
    return this.http.put('http://localhost:5000/api/produto/' + produto.id, produto);
  }
  deleteProduto(id: number) {
    return this.http.delete('http://localhost:5000/api/produto/' + id);
  }

}

