import { Produto } from 'src/app/_models/Produto';
import { CarrinhoItemModel } from './CarrinhoItemModel';
export class Pedido {
    id: number;
    dataHora: Date;
    valorTotal: number;
    userId?: number;
    item: string;
    endereco: string;
    telefone: string;

}
