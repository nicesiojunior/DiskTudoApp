import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../_models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseURL = 'http://localhost:5000/api/pedido';

  constructor(private http: HttpClient) {}
    getPedido() {
      return this.http.get(this.baseURL);
    }

    getAllPedido(): Observable<Pedido[]> {
      return this.http.get<Pedido[]>(this.baseURL);
    }

    getPedidoByData(data: Date): Observable<Pedido> {
      return this.http.get<Pedido>('${this.baseUrl}/getBydata/${data}');
    }

    getPedidoById(id: number): Observable<Pedido[]> {
      return this.http.get<Pedido[]>('http://localhost:5000/api/pedido/' + id);
    }

    register(pedido: Pedido) {
      return this.http.post('http://localhost:5000/api/pedido/', pedido);
    }

}
