import { Cliente } from './cliente.model';

export class Pedido {
    id: number;
    datapedido: string;
    idcliente = new Cliente();
    valorpedido: number;
}
