import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AccountsComponent } from './dashboard/accounts/accounts.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { ReportComponent } from './dashboard/report/report.component';
import { DepositsComponent } from './dashboard/deposits/deposits.component';
import { RDComponent } from './dashboard/rd/rd.component';
import { ViewComponent } from './dashboard/view/view.component';
import { FdComponent } from './dashboard/fd/fd.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,

    // canActivate: [authGuard]

    children: [
      {
        path: 'overview', component: OverviewComponent,
      },
      {
        path: 'accounts', component: AccountsComponent,
      },
      {
        path: 'transactions', component: TransactionsComponent,

      },
      {
        path: 'transfer', component: ReportComponent,

      },
      {
        path: 'fd', component: FdComponent,

      },
      {
        path: 'rd', component: RDComponent,

      },
      {
        path: 'view', component: ViewComponent,

      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }






















// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'dashboard',
//     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PagesRoutingModule { }
