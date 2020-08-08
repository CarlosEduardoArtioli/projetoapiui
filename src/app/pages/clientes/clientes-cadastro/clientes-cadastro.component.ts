import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { CidadesService } from '../../../services/cidades.service';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {

  clientes = [];
  cidades = [];
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private cidadesService: CidadesService,
    private clientesService: ClientesService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idCliente = this.route.snapshot.params['id'];

    if (idCliente) {
      this.carregarCliente(idCliente);
    }

    this.carregarCidades();
  }


  carregarCliente(id: number) {
      this.clientesService.buscarPorId(id)
      .then(cliente => {
        this.formulario.patchValue(cliente);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      telefone: [null, Validators.required],
      cidade: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      })
    });
  }

  carregarCidades() {
    return this.cidadesService.listarTodasCidades()
    .then(cidades => {
      this.cidades = cidades
      .map(c => ({label: c.nome, value: c.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando){
      this.atualizarCliente();
    } else {
      this.adicionarCliente();
    }
  }

  adicionarCliente() {
    this.clientesService.adicionar(this.formulario.value)
    .then(clienteAdicionado => {
      this.messageService.add({severity: 'success', detail: 'Cliente adicionado com sucesso!'});

      this.router.navigate(['/clientes']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente() {
    this.clientesService.atualizar(this.formulario.value)
    .then(cliente => {
      this.formulario.patchValue(cliente);
      this.messageService.add({severity: 'success', detail: 'Cliente alterado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
