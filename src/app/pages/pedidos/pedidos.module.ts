import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [PedidosPesquisaComponent, PedidosCadastroComponent],
  exports: [PedidosPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    PanelModule,
    DialogModule
  ]
})
export class PedidosModule { }
