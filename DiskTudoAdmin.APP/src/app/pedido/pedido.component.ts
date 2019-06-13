import { Component, OnInit } from '@angular/core';
import { Pedido } from '../_models/Pedido';
import { PedidoService } from '../_services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.pedidosFiltrados = this._filtroLista ? this.filtrarPedidos(this._filtroLista) : this.pedidos;
  }

  pedidosFiltrados: Pedido[];

  pedidos: Pedido[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.getPedidos();
  }

  filtrarPedidos(filtrarPor: string): Pedido[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pedidos.filter(
      pedido => pedido.data.toDateString().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getPedidos() {
    // tslint:disable-next-line:variable-name
    this.pedidoService.getAllPedido().subscribe((_pedido: Pedido[]) => {
      this.pedidos = _pedido;
      this.pedidosFiltrados = this.pedidos;
      console.log(_pedido);
    }, error => {
      console.log(error);
    });
  }

}
