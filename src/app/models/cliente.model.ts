import { Cidade } from './cidade.model';

export class Cliente {
    id: number;
    nome: string;
    telefone: string;
    cidade_id = new Cidade();
}
