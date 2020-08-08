import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaFiltro, CategoriasService } from 'src/app/services/categorias.service';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html',
  styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  categorias = [];

  @ViewChild('tabela', { static: true }) grid;
  constructor(
    private categoriasService: CategoriasService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriasService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.categorias = resultado.categorias;
      });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(categoria: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir esse registro?',
      accept: () => {
        this.excluir(categoria);
      }
    });
  }

  excluir(categoria: any) {
    this.categoriasService.excluir(categoria.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        }
        else {
          this.grid.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Categoria excluida com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
