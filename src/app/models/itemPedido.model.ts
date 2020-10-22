import { Produto } from './produto.model';

export class ItemPedido {
    id: number;
    produto = new Produto();
    qtdeitem: number;
    valorunitario: number;
    totalitem: number;

    constructor(
        id?: number,
        produto?: Produto,
        qtdeitem?: number,
        valorunitario?: number,
        totalitem?: number
    ) {
            this.id = id,
            this.produto = produto,
            this.qtdeitem = qtdeitem,
            this.valorunitario = valorunitario,
            this.totalitem = totalitem;
    }
}
