import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// const routes: Routes = [
//   {
//     path: '',
//     component: ReportComponent
//   }
// ];

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports:[ReportComponent]
})
export class ReportModule { }
