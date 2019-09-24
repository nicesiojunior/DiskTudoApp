import { Injectable } from '@angular/core';
import { Carrinho } from '../_models/Carrinho';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../_models/Produto';
import { CarrinhoItemModel } from '../_models/CarrinhoItemModel';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // tslint:disable-next-line:variable-name
  public _carrinho: Carrinho = new Carrinho();
  private carrinho: Observable<Carrinho>;
  private carrinhoObservable: any;
  data: Produto[];
  private cart: [];
  dest: any[];
  public paramData;
  itemId = 0;
  itemPed = 0;

  constructor(public http: HttpClient) {
    this.carrinho = Observable.create(obs => {
      this._carrinho.datahora = new Date();
      this._carrinho.itens = new Array<CarrinhoItemModel>();
      this._carrinho.valorTotal = 0.0;
      this.carrinhoObservable = obs;
      this.carrinhoObservable.next(this._carrinho);
    });
   }

  setParamData(data) {
    this.paramData = data;
  }
  getParamsData() {
    return this.paramData;
  }

  public getCarrinho(): Observable<Carrinho> {
    return this.carrinho;
  }

  adicionarNovoItem(item: Produto, qtdadeCompra: number): void {
    // tslint:disable-next-line:prefer-const
    let isExiste = false;
    this._carrinho.itens.forEach(prod => {
      // tslint:disable-next-line:triple-equals
      if (prod.produtoId == item.id) {
        prod.qtdade += prod.qtdade;
        isExiste = true;
      }
    });
    // tslint:disable-next-line:prefer-const
    let newItem = new CarrinhoItemModel();
    // tslint:disable-next-line:prefer-const
    let session: any = [];
    newItem.qtdade = qtdadeCompra;
    newItem.valor = item.valor;
    newItem.produtoId = item.id;
    newItem.produto = item;
    this._carrinho.itens.push(newItem);

    this.calcularCarrinho();
    this.carrinhoObservable.next(this._carrinho);
  }

  private calcularCarrinho(): void {

    this._carrinho.valorTotal = 0;
    this._carrinho.itens.forEach(prod => {
      this._carrinho.valorTotal += (prod.valor * prod.qtdade);
    });

  }

  // adicionarNovoItem(item: Produto) {
  //   // tslint:disable-next-line:prefer-const
  //   let newProduto = new CarrinhoItemModel();
  //   newProduto.Produto = item;
  //   newProduto.Quantidade = 1;

  //   this._carrinho.itens.forEach((it: CarrinhoItemModel) => {
  //     this._carrinho.valorTotal += it.Produto.valor;
  //   });

  //   this._carrinho.itens.push(newProduto);
  //   this.carrinhoObservable.next(this._carrinho);
  // }


}
