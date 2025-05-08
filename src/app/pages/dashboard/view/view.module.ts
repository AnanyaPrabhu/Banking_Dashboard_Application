import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [ViewComponent]
})
export class ViewModule { }
