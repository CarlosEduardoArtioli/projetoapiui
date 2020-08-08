import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadesService } from 'src/app/services/cidades.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-cidades-cadastro',
  templateUrl: './cidades-cadastro.component.html',
  styleUrls: ['./cidades-cadastro.component.css']
})
export class CidadesCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cidadesService: CidadesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idCidade = this.route.snapshot.params['id'];

    if (idCidade){
      this.carregarCidade(idCidade);
    }
  }

  carregarCidade(id: number){
    this.cidadesService.buscarPorId(id)
    .then(cidade => {
      this.formulario.patchValue(cidade);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      estado: [null, [Validators.required, Validators.maxLength(2)]]
    });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarCidade();
    }
    else {
      this.adicionarCidade();
    }
  }

  adicionarCidade() {
    this.cidadesService.adicionar(this.formulario.value)
    .then(cidadeAdicionada => {
      this.messageService.add({severity: 'success', detail: 'Cidade adicionada com sucesso'});

      this.router.navigate(['/cidades']);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCidade() {
    this.cidadesService.atualizar(this.formulario.value)
    .then(cidade => {
      this.formulario.patchValue(cidade);
      this.messageService.add({severity: 'success', detail: 'Cidade alterada com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
