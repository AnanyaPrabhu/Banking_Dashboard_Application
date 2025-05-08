import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { OverviewModule } from './dashboard/overview/overview.module';
import { AccountsModule } from './dashboard/accounts/accounts.module';
import { ReportModule } from './dashboard/report/report.module';
import { TransactionsModule } from './dashboard/transactions/transactions.module';
import { SidebarModule } from './dashboard/sidebar/sidebar.module';
import { TopbarModule } from './dashboard/topbar/topbar.module';
import { DepositsModule } from './dashboard/deposits/deposits.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RdModule } from './dashboard/rd/rd.module';
import { ViewModule } from './dashboard/view/view.module';
import { HttpClientModule } from '@angular/common/http';
import { FdModule } from './dashboard/fd/fd.module';



@NgModule({
  imports: [
    FdModule,
    HttpClientModule,
    ViewModule,
    ToastModule,
    DialogModule,
    InputSwitchModule,
    ButtonModule,
    RadioButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    DepositsModule,
    TopbarModule,
    SidebarModule,
    CommonModule,
    OverviewModule,
    AccountsModule,
    TransactionsModule,
    ReportModule,
    PagesRoutingModule,
    DashboardModule,
    FormsModule,
    TableModule,
    ProgressBarModule,
    ChartModule,
    BreadcrumbModule,
    CardModule,
    RdModule

  ],
  declarations: [

  ],
  exports: [

    TableModule,
    ProgressBarModule,
    DashboardModule
  ]
})
export class PagesModule { }
