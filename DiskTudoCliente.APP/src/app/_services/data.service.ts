import { Injectable } from '@angular/core';
import { Produto } from '../_models/Produto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  produtosComprados: any = [];
  private data = [];

  constructor() { }

  setData(id, data) {
    this.data[id] = data;
  }

  getData(id) {
    return this.data[id];
  }

  // AddProdutos() {
  // }
}
