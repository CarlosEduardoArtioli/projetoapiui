import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProdutosService } from 'src/app/services/produtos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {

  produtos = [];
  categorias = [];
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private categoriasService: CategoriasService,
    private produtosService: ProdutosService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idProduto = this.route.snapshot.params['id'];

    if (idProduto) {
      this.carregarProduto(idProduto);
    }

    this.carregarCategorias();
  }


  carregarProduto(id: number) {
      this.produtosService.buscarPorId(id)
      .then(produto => {
        this.formulario.patchValue(produto);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      preco: [null, Validators.required],
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      })
    });
  }

  carregarCategorias() {
    return this.categoriasService.listarTodasCategorias()
    .then(categorias => {
      this.categorias = categorias
      .map(c => ({label: c.nome, value: c.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando){
      this.atualizarProduto();
    } else {
      this.adicionarProduto();
    }
  }

  adicionarProduto() {
    this.produtosService.adicionar(this.formulario.value)
    .then(produtoAdicionado => {
      this.messageService.add({severity: 'success', detail: 'Produto adicionado com sucesso!'});

      this.router.navigate(['/produtos']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto() {
    this.produtosService.atualizar(this.formulario.value)
    .then(produto => {
      this.formulario.patchValue(produto);
      this.messageService.add({severity: 'success', detail: 'Produto alterado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
