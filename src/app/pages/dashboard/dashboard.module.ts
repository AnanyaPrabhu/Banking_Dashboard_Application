import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
// import {DashboardRoutingModule} from './dashboard-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgChartsModule } from 'ng2-charts';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverviewModule } from './overview/overview.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ReportModule } from './report/report.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { TopbarModule } from './topbar/topbar.module';
import { CarouselModule } from 'primeng/carousel';
import { DepositsModule } from './deposits/deposits.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RdModule } from './rd/rd.module';
import { ViewModule } from './view/view.module';
import { HttpClientModule } from '@angular/common/http';
import { FdModule } from './fd/fd.module';







@NgModule({
  declarations: [DashboardComponent],
  imports: [
    // DashboardRoutingModule,
    FdModule,
    HttpClientModule,
    ViewModule,
    ToastModule,
    DialogModule,
    InputSwitchModule,
    RadioButtonModule,
    ReactiveFormsModule,
    DepositsModule ,
    CarouselModule,
    TopbarModule,
    SidebarModule,
    ReportModule,
    OverviewModule,
    TransactionsModule,
    AccountsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    BreadcrumbModule,
    FormsModule,
    RouterModule,
    CardModule,
    DropdownModule,
    MenuModule,
    ChartModule,
    ProgressBarModule,
    NgChartsModule,
    RdModule
  
  ],
   exports: [
    DashboardComponent,
 
   ]
})
export class DashboardModule { }




