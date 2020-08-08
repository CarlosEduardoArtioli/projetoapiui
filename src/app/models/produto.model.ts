import { Categoria } from './categoria.model';

export class Produto {
    id: number;
    nome: string;
    preco: number;
    idcategoria = new Categoria();
}
