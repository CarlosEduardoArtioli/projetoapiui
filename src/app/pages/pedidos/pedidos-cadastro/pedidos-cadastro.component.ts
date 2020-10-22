import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidosService } from '../../../services/pedidos.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ClientesService } from '../../../services/clientes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {

  pedido = new Pedido();
  exibirFormularioItem = false;
  clientes = [];

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private clientesService: ClientesService,
  ) { }

  ngOnInit() {
    const idPedido = this.route.snapshot.params['id'];

    if (idPedido) {
      this.carregarPedido(idPedido);
    }
  }

  carregarPedido(id: number) {
    this.pedidosService.buscarPorId(id)
      .then(pedido => {
        this.pedido = pedido;
      });
  }

  get editando() {
    return Boolean(this.pedido.id);
  }

  carregarClientes(event) {
    const query = event.query;
    this.clientesService.getClientes(query).then(clientes => {
      this.clientes = clientes;
    });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPedido(form);
    } else {
      this.adicionarPedido(form);
    }
  }

  adicionarPedido(form: FormControl) {
    this.pedidosService.adicionar(this.pedido)
      .then(pedidoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Pedido adicionado com sucesso' });

        this.router.navigate(['/pedidos']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  atualizarPedido(form: FormControl) {
    this.pedidosService.atualizar(this.pedido)
      .then(pedido => {
        this.pedido = pedido;
        this.messageService.add({ severity: 'success', detail: 'Pedido alterado com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // Itens do Pedido
  prepararNovoItem() {
    this.exibirFormularioItem = true;
  }

  closeForm() {
    this.exibirFormularioItem = false;
  }

}
