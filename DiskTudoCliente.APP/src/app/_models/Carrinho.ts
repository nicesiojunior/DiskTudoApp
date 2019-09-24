import { CarrinhoItemModel } from './CarrinhoItemModel';
import { Produto } from './Produto';

export class Carrinho {
    datahora: Date;
    valorTotal = 0.0;
    itens: CarrinhoItemModel[];

    constructor() {
        this.itens = [];
    }
}
