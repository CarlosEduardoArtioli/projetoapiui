import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoFiltro, ProdutosService } from 'src/app/services/produtos.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  produtos = [];

  @ViewChild('tabela', { static: true }) grid;
  constructor(
    private produtosService: ProdutosService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.produtosService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
      });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir esse registro?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtosService.excluir(produto.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Produto excluido com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
