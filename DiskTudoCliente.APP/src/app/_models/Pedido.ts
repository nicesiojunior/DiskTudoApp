import { Produto } from './Produto';
import { CarrinhoItemModel } from './CarrinhoItemModel';

export class Pedido {
    id: number;
    dataHora: Date;
    valorTotal: number;
    userId?: number;
    item: CarrinhoItemModel[];
    endereco: string;
    telefone: string;

    constructor() {
        this.item = [];
    }
}
