import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../_models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseURL = 'http://localhost:5000/api/categoria';

  constructor(private http: HttpClient) {}
    getCategoria() {
      return this.http.get(this.baseURL);
    }

    getAllCategoria(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.baseURL);
    }

    getCategoriaByName(name: string): Observable<Categoria> {
      return this.http.get<Categoria>('${this.baseUrl}/getByName/${name}');
    }

    getCategoriaById(id: number): Observable<Categoria> {
      return this.http.get<Categoria>('${this.baseUrl}/${id}');
    }

}
