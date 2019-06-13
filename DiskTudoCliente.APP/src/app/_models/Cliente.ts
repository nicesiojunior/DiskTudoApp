import { Pedido } from './Pedido';

export interface Cliente {
    id: number;
    nomeCliente: string;
    endereco: string;
    telefone: string;
    login: string;
    password: string;
    pedido: Pedido[];
}
