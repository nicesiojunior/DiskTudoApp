import { Pedido } from './Pedido';

export class Produto {
    id: number;
    nomeProduto: string;
    descricao: string;
    valor: number;
    imagemURL: string;
    categoriaId?: number;
}
