import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CidadesModule } from './pages/cidades/cidades.module';
import { RouterModule, Routes } from '@angular/router';
import { CidadesPesquisaComponent } from './pages/cidades/cidades-pesquisa/cidades-pesquisa.component';
import { CidadesService } from './services/cidades.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientesPesquisaComponent } from './pages/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesModule } from './pages/clientes/clientes.module';
import { ClientesService } from './services/clientes.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerService } from './core/error-handler.service';
import { CidadesCadastroComponent } from './pages/cidades/cidades-cadastro/cidades-cadastro.component';
import { ClientesCadastroComponent } from './pages/clientes/clientes-cadastro/clientes-cadastro.component';
import { CategoriasPesquisaComponent } from './pages/categorias/categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasCadastroComponent } from './pages/categorias/categorias-cadastro/categorias-cadastro.component';
import { ProdutosPesquisaComponent } from './pages/produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './pages/produtos/produtos-cadastro/produtos-cadastro.component';
import { CategoriasModule } from './pages/categorias/categorias.module';
import { ProdutosModule } from './pages/produtos/produtos.module';
import { CategoriasService } from './services/categorias.service';
import { ProdutosService } from './services/produtos.service';
import { PedidosPesquisaComponent } from './pages/pedidos/pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidosModule } from './pages/pedidos/pedidos.module';
import { PedidosService } from './services/pedidos.service';
import { PedidosCadastroComponent } from './pages/pedidos/pedidos-cadastro/pedidos-cadastro.component';

const routes: Routes = [
  { path: 'cidades', component: CidadesPesquisaComponent },
  { path: 'cidades/novo', component: CidadesCadastroComponent },
  { path: 'cidades/:id', component: CidadesCadastroComponent },

  { path: 'clientes', component: ClientesPesquisaComponent },
  { path: 'clientes/novo', component: ClientesCadastroComponent },
  { path: 'clientes/:id', component: ClientesCadastroComponent },

  { path: 'categorias', component: CategoriasPesquisaComponent },
  { path: 'categorias/novo', component: CategoriasCadastroComponent },
  { path: 'categorias/:id', component: CategoriasCadastroComponent },

  { path: 'produtos', component: ProdutosPesquisaComponent },
  { path: 'produtos/novo', component: ProdutosCadastroComponent },
  { path: 'produtos/:id', component: ProdutosCadastroComponent },

  { path: 'pedidos', component: PedidosPesquisaComponent },
  { path: 'pedidos/novo', component: PedidosCadastroComponent },
  { path: 'pedidos/:id', component: PedidosCadastroComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CoreModule,
    CidadesModule,
    ToastModule,
    ClientesModule,
    CategoriasModule,
    ProdutosModule,
    PedidosModule,
  ],
  providers: [
    CidadesService,
    ClientesService,
    CategoriasService,
    ProdutosService,
    PedidosService,
    ConfirmationService,
    MessageService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
