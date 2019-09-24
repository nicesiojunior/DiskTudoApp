import { Component, OnInit } from '@angular/core';
import { Pedido } from '../_models/Pedido';
import { PedidoService } from '../_services/pedido.service';
import { LoadingController } from '@ionic/angular';
import { ProdutoService } from '../_services/produto.service';
import { Produto } from '../_models/Produto';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  // _filtroLista: string;

  // get filtroLista(): string {
  //   return this._filtroLista;
  // }
  // set filtroLista(value: string) {
  //   this._filtroLista = value;
  //   this.pedidosFiltrados = this._filtroLista ? this.filtrarPedidos(this._filtroLista) : this.pedidos;
  // }

  pedidosFiltrados: Pedido[];

  pedidos: any;
  qtdade: number;
  // tslint:disable-next-line:variable-name
  _produto: Produto;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  produto: any;

  constructor(private pedidoService: PedidoService,
              public loadingController: LoadingController,
              public prodSrv: ProdutoService) { }

  ngOnInit() {
    this.getPedidos();
    this.presentLoading();
  }

  // filtrarPedidos(filtrarPor: string): Pedido[] {
  //   filtrarPor = filtrarPor.toLocaleLowerCase();
  //   return this.pedidos.filter(
  //     pedido => pedido.data.toDateString().indexOf(filtrarPor) !== -1
  //   );
  // }
  async presentLoading() {
    const loading = await
      this.loadingController.create({
      duration: 2
    });

    return await loading.present();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getPedidos() {
    this.pedidos = [];
    this.qtdade = 0;
    // tslint:disable-next-line:variable-name
    this.pedidoService.getAllPedido().subscribe((_pedido: Pedido[]) => {
      this.pedidos = _pedido;
      this.pedidos.forEach(element => {
        element.item = JSON.parse(element.item);
      });
      // tslint:disable-next-line:variable-name
      console.log(_pedido);
    }, error => {
      console.log(error);
    });
  }



}
