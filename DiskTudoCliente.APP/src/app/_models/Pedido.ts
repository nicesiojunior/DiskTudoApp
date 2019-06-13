import { Produto } from './Produto';

export interface Pedido {
    id: number;
    qtadade: number;
    data: Date;
    clienteId?: number;
    valorFinal: number;
    produtoPedido: Produto[];
}
