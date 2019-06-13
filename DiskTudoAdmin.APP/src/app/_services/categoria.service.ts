import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../_models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  registerCategoria(categoria: Categoria[]) {
    return this.http.post('http://localhost:5000/api/categoria/', categoria);
  }

}
