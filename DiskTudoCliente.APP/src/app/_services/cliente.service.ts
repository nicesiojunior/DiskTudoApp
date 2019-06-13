import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseURL = 'http://localhost:5000/api/cliente';

  constructor(private http: HttpClient) {}
    getCliente() {
      return this.http.get(this.baseURL);
    }

    getAllCliente(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.baseURL);
    }

    getClienteByLogin(login: string): Observable<Cliente> {
      return this.http.get<Cliente>('${this.baseURL}/getByLogin/${login}');
    }

    getClienteBySenha(senha: string): Observable<Cliente> {
      return this.http.get<Cliente>('${this.baseURL}/getBysenha/${senha}');
    }

    getClienteById(id: number): Observable<Cliente> {
      return this.http.get<Cliente>('${this.baseURL}/${id}');
    }

    //postCliente(cliente: Cliente) {
      //this.cli = 
      
    //}



}
