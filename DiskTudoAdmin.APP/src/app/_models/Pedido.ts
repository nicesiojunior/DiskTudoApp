import { Produto } from 'src/app/_models/Produto';
export class Pedido {
    id: number;
    qtadade: number;
    data: Date;
    clienteId?: number;
    valorFinal: number;
    produtoPedido: Produto[];
}
