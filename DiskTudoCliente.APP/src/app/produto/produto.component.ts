import { Component, OnInit } from '@angular/core';
import { Produto } from '../_models/Produto';
import { ProdutoService } from '../_services/produto.service';
import { NavController, NavParams, ModalController, LoadingController } from '@ionic/angular';
import { PedidoComponent } from '../pedido/pedido.component';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../_services/data.service';
import { Carrinho } from '../_models/Carrinho';
import { Categoria } from '../_models/Categoria';
import { CategoriaComponent } from '../categoria/categoria.component';
import { CarrinhoService } from '../_services/carrinho.service';
import { CarrinhoItemModel } from '../_models/CarrinhoItemModel';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _filtroLista: string;
  produtos: Array<Produto> = new Array<Produto>();
  itens: Array<Carrinho> = new Array<Carrinho>();
  prodQuant: number;
  /// veja que vc quando clica em comprar vc preenche esse objeto, e quando vc
  // clicar no carrinho vc tem que enviar esse objeto para a pagina de carrinho
  carrinho: Carrinho = new Carrinho();
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltrados = this._filtroLista ? this.filtrarProdutos(this._filtroLista) : this.produtos;
  }

  cart: [];
  produtosFiltrados: Produto[];

  // produtos: Produto[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private produtoService: ProdutoService,
              private router: Router,
              private dataService: DataService,
              public navCtrl: NavController,
              private carrinhoSrv: CarrinhoService,
              public ModalCtrl: ModalController,
              public loadingController: LoadingController) { }

  ngOnInit() {
   // this.getProdutos();
    this.presentLoading();

    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;
      console.log(this.carrinho);
    });
    if (localStorage.getItem('token')) {
      this.getProdutos();
    } else {
      this.navCtrl.navigateRoot('/user/login');
    }

  }

  // quantidadeAlterada(produto: Produto, evt: number): void {
  //   console.log(`${produto.nomeProduto} - quantidade: ${evt}`);
  //   // this.produtos.push(produto);
  //   this.carrinhoSrv.adicionarNovoItem(produto);
  // }

  // tslint:disable-next-line:member-ordering
  user = {
    name: 'Simon Grimm',
    website: 'www.ionicacademy.com',
    address: {
      zip: 48149,
      city: 'Muenster',
      country: 'DE'
    },
    interests: [
      'Ionic', 'Angular', 'YouTube', 'Sports'
    ]
  };

  openDetailsWithState() {
    const navigationExtras: NavigationExtras = {
      state: {
        itens: this.carrinhoSrv._carrinho
      }
    };
    this.router.navigate(['carrinho'], navigationExtras);
    /*
    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.itens.push(data);
      console.log('iteeeeeen', this.itens);
      // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:align
    // tslint:disable-next-line:prefer-const
    });
    */

  }


  // tslint:disable-next-line:variable-name
  visualizarCarrinho() {

    this.router.navigate(['carrinho'], {
      queryParams: {carrinho: this.carrinhoSrv._carrinho}
    });
    // tslint:disable-next-line:prefer-const
    /*
    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;

      // this.itens.push(data);
      // tslint:disable-next-line:prefer-const
      // let dataSTR = JSON.stringify(this.carrinho);
      // console.log(this.carrinho);
      // this.carrinhoSrv.setParamData(this.carrinho);
      // this.router.navigateByUrl('carrinho');
    });
    */

  }

  adicionarNoCarrinho() {
    console.log('Produto adicionado ao carrinho com sucesso!');
  }

  filtrarProdutos(filtrarPor: string): Produto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      produto => produto.nomeProduto.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }


  getProdutos() {
    // tslint:disable-next-line:variable-name
    this.produtoService.getAllProduto().subscribe((_produto: Produto[]) => {
      this.produtos = _produto;
      this.produtosFiltrados = this.produtos;
      // console.log(_produto);
    }, error => {
      console.log(error);
    });
  }

  comprar() {
    // tslint:disable-next-line:prefer-const
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.produtos)
      }
    };
    this.router.navigate(['pedido'], navigationExtras);
  }

  comprarProdutos(produto: Produto, quantidade: number) {
    // tslint:disable-next-line:new-parens
    console.log(`${produto.nomeProduto} - quantidade: ${this.prodQuant}`);
    this.carrinhoSrv.adicionarNovoItem(produto, this.prodQuant);
  }

  async presentLoading() {
    const loading = await
      this.loadingController.create({
      duration: 2
    });

    return await loading.present();
  }

  // Teste(produto: Produto, quantidade: number) {
  //   console.log(`${produto} - quantidade: ${event}`);
  //   this.carrinhoSrv.adicionarNovoItem(produto);
  // }

  // obterQtdade(item) {
  //   item.qtdCompra =
  // }

  // adicionarQuantidade(item) {
  //   item.qtdade += item.qtdade;
  //   if (item.qtdade > 0) {
  //     this.produtos = this.produtos.filter( prods => {
  //       return prods.qtdCompra > 0;
  //     });
  //   }
  // }

  // removerQuantidade(item: any) {
  //   item.qtdCompra = item.qtdCompra - 1;
  //   if (item.qtdCompra > 0) {
  //     this.produtos = this.produtos.filter( prods => {
  //       return prods.qtdCompra > 0 ;
  //     });
  //   }

  //   if (item.qtdCompra < 0) {
  //     alert('A quantidade deve ser superior a 0!');
  //     item.qtdCompra = 0;
  //   }
  // }


}
