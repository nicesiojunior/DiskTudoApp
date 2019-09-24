import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../_models/Produto';
import { ProdutoService } from '../_services/produto.service';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _filtroLista: string;
  produtos: Array<Produto> = new Array<Produto>();
  // itens: Array<Carrinho> = new Array<Carrinho>();
  prodQuant: number;
  /// veja que vc quando clica em comprar vc preenche esse objeto, e quando vc
  // clicar no carrinho vc tem que enviar esse objeto para a pagina de carrinho
  // carrinho: Carrinho = new Carrinho();
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
  produto: Produto;

  constructor(private produtoService: ProdutoService,
              private router: Router,
              public navCtrl: NavController,
              public loadingController: LoadingController) { }

  ngOnInit() {
   // this.getProdutos();
    this.presentLoading();
    this.getProdutos();

  }

  removerProduto(produto: Produto) {
    this.produto = produto;
    this.produtoService.deleteProduto(this.produto.id).subscribe(() => {
      console.log('Deletado com sucesso');
    });
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


  async presentLoading() {
    const loading = await
      this.loadingController.create({
      duration: 2
    });

    return await loading.present();
  }

}
