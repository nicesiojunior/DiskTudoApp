import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CarrinhoService } from '../_services/carrinho.service';
import { Produto } from '../_models/Produto';
import { Carrinho } from '../_models/Carrinho';
import { CarrinhoItemModel } from '../_models/CarrinhoItemModel';
import { Pedido } from '../_models/Pedido';
import { PedidoComponent } from '../pedido/pedido.component';
import { PedidoService } from '../_services/pedido.service';
import { ProdutoService } from '../_services/produto.service';
import { AuthService } from '../_services/auth.service';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  cart = '';
  data: Carrinho[]; // Array<Carrinho> = new Array<Carrinho>();
  dataTransfer: Carrinho[];
  itens = [];
  pedidoCompra: Pedido;
  produtos: Produto;
  private produto: Produto[];
  recebe: any = [];
  recebeProd: any = [];
  carrinho: Carrinho = new Carrinho();
  Ped2: Pedido = new Pedido();
  ListaPed = '';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  // tslint:disable-next-line:variable-name
  public _pedido: Pedido = new Pedido();
  private pedido: Observable<Pedido>;
  private pedidoObservable: any;
  teste: any = [];
  endereco: string;
  telefone: string;

  constructor(public navCtrl: NavController,
              private router: Router,
              public carrinhoSvr: CarrinhoService,
              private route: ActivatedRoute,
              public pedidoSrv: PedidoService,
              public produtoSrv: ProdutoService) {
                this.data = [];
                this.dataTransfer = [];
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.data = this.router.getCurrentNavigation().extras.state.itens;
                    console.log('Carrinho - Produto', this.data);
                    this.dataTransfer = this.data;
                    // this.data[].itens[].produto.
                  }
                });
                // this.pedido = {
                this._pedido.dataHora = new Date();
                this._pedido.item = new Array<CarrinhoItemModel>();
                this._pedido.valorTotal = 0.0;
                  // this.pedidoObservable = obs;
                  // this.pedidoObservable.next(this._pedido);
               }

  ngOnInit() {

  }

  finalizarPedido() {
    const navigationExtras: NavigationExtras = {
      state: {
        itens: this.dataTransfer
      }
    };
    this.router.navigate(['pedido'], navigationExtras);
  }

  adicionarNovoItem(item: Carrinho) {
    // tslint:disable-next-line:prefer-const
    let newItem: any = {}; // new Pedido();
    newItem.valorTotal = item.valorTotal + 4;
    newItem.dataHora = item.datahora;
    newItem.item = [];
    newItem.endereco = this.endereco;
    newItem.telefone = this.telefone;

    const user = localStorage.getItem('token');
    this.decodeToken = this.jwtHelper.decodeToken(user);
    // tslint:disable-next-line:radix
    newItem.userId = parseInt(this.decodeToken.nameid);
    this.teste = this.decodeToken;
    console.log('Usuario', this.teste);

    // this.teste = JSON.parse(this.teste);

    console.log('Teste JSON', this.teste);

    item.itens.forEach(element => {
      newItem.item.push({
        qtdade: element.qtdade,
        produto: element.produto
      });
    });


    this.ListaPed = JSON.stringify(newItem.item).toString();
    // tslint:disable-next-line:no-unused-expression
    // item.itens.forEach(element => {
    //   newItem.itens.push(element);
    // });
    newItem.item = this.ListaPed;

    this._pedido = newItem;

    // this.calcularCarrinho();
    // this.pedidoObservable.next(this._pedido);

    console.log('Agora Vai?', this._pedido);
    console.log('Itens Foi?', this._pedido.item);
    this.pedidoSrv.register(this._pedido).subscribe(
      () => {
        this.router.navigate(['/produto']);
        console.log('Pedido Realizado');
      }
    );

  }

  getProdutos(id: number) {
    // tslint:disable-next-line:variable-name
    this.produtoSrv.getProdutoById(id).subscribe((_produto: Produto) => {
      this.produtos = _produto;
      // console.log(_produto);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:member-ordering
  ConcluirCompra(): void {
    // for (const i = 0; i < this.dataTransfer.length; ) {
    //   this.Ped2.itens.push(this.dataTransfer[i].itens[i]);
    //   this.Ped2.dataHora = this.dataTransfer[i].datahora;
    //   this.Ped2.valorTotal = this.dataTransfer[i].valorTotal;
    // }
    console.log('Ne Possivel', this.dataTransfer);

    for (let i = 0; i <= this.dataTransfer.length + 1; i++) {
      this.Ped2.dataHora = this.dataTransfer[i].datahora;
      this.Ped2.valorTotal = this.dataTransfer[i].valorTotal;
      this.Ped2.item.push(this.dataTransfer[i].itens[i]);
    }
    console.log('Testeeee', this.Ped2);
  }

    // this.dataTransfer.forEach(element => {
    //   Ped.dataHora = element.datahora;
    //   Ped.valorTotal = element.valorTotal;
    //   Ped.itens = element.itens;
    //   return this.pedidoSrv.register(Ped);
    // });

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:prefer-const
    // let ped: any = {};
    // ped.itens = [];
    // ped.itens.produto = [];
    // this.dataTransfer.forEach(element => {
    //   ped.valorTotal = element.valorTotal;
    //   ped.dataHora = element.datahora;
    //   element.itens.forEach(prod => {
    //     ped.itens.qtdade = prod.qtdade;
    //     ped.itens.valor = prod.valor;
    //     ped.itens.produto.push(prod.produto);
    //   });
    // });
    // pedido.itens[].

    // pedido.itens.forEach(prod => {
    //   ped.itens.push({
    //     qtdade : prod.qtdade,
    //     valor : prod.valor
    //   });
    //   ped.itens.produto.push({
      //     produto: prod.produto
      //   });
    // });

    // ped = JSON.stringify(ped);

    // const session = this.dataTransfer;

    // localStorage.setItem('session', JSON.stringify(session));

    // const recebe = JSON.parse(localStorage.getItem('session'));
    // console.log('Teste Local Storage', recebe);

    // // tslint:disable-next-line:prefer-const
    // let pedido: any[];

    // pedido = recebe;
    // console.log('Teste Local Storage 222222', pedido);



    // return this.pedidoSrv.register(pedido);


    // tslint:disable-next-line:prefer-const
    // let ped: Pedido;
    // this.dataTransfer.forEach(element => {
    //   ped.dataHora = element.datahora;
    //   ped.valorTotal = element.valorTotal;
    //   ped.produto = element.itens;
    //   // tslint:disable-next-line:prefer-for-of
    //   this.pedidoSrv.register(ped);
    //   console.log('Testeeee', ped);

    // });

    // tslint:disable-next-line:label-position
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const

    // tslint:disable-next-line:prefer-const
    // let ped: Pedido;

    // for (const i = 0; i < this.dataTransfer.length; ) {

    //   // tslint:disable-next-line:prefer-const
    //   ped.produto = this.dataTransfer[i].itens;
    //   ped.dataHora = this.dataTransfer[i].datahora;
    //   ped.valorTotal = this.dataTransfer[i].valorTotal;


    //   console.log('Testeeee', ped);
    // }


}
