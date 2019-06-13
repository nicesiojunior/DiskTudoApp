import { Pedido } from './Pedido';

export interface Produto {
    id: number;
    nomeProduto: string;
    descricao: string;
    valor: number;
    imagemURL: string;
    categoriaId?: number;
    produtoPedido: Pedido[];
}
