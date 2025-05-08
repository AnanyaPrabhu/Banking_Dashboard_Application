import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

// const routes: Routes = [
//   { path: '', component: AccountsComponent }
// ];

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, TableModule, ChartModule ],
  exports:[AccountsComponent]
})
export class AccountsModule {}
