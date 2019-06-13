import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../_models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseURL = 'http://localhost:5000/api/pedido';

  constructor(private http: HttpClient) {}
    getPedido() {
      return this.http.get('http://localhost:5000/api/pedido');
    }

    getAllPedido(): Observable<Pedido[]> {
      return this.http.get<Pedido[]>('http://localhost:5000/api/pedido');
    }

    getPedidoByData(data: string): Observable<Pedido> {
      return this.http.get<Pedido>('http://localhost:5000/api/pedido/getByName/${data}');
    }

    getPedidoById(id: number): Observable<Pedido> {
      return this.http.get<Pedido>('http://localhost:5000/api/pedido/${id}');
    }

}
