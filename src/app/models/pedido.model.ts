import { Cliente } from './cliente.model';
import { ItemPedido } from './itemPedido.model';

export class Pedido {
    id: number;
    datapedido: Date;
    cliente = new Cliente();
    valorpedido: number;
    itens = new Array<ItemPedido>();
}
