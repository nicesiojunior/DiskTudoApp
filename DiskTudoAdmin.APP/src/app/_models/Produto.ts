import { Pedido } from 'src/app/_models/Pedido';
export class Produto {
    id: number;
    nomeProduto: string;
    descricao: string;
    valor: number;
    qtdade: number;
    imagemURL: string;
    categoriaId?: number;
}
