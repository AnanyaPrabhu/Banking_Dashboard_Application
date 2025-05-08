import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,ChartModule
  ],
  exports:[TransactionsComponent]
})
export class TransactionsModule { }
