import { Component, OnInit } from '@angular/core';
import { Produto } from '../_models/Produto';
import { ProdutoService } from '../_services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltrados = this._filtroLista ? this.filtrarProdutos(this._filtroLista) : this.produtos;
  }

  produtosFiltrados: Produto[];

  produtos: Produto[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
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
      console.log(_produto);
    }, error => {
      console.log(error);
    });
  }

}
