import { Produto } from './Produto';

export interface Categoria {
    id: number;
    nomeCategoria: string;
    produto: Produto[];
}
