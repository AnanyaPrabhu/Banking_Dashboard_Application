import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, ChartModule, CardModule, CarouselModule, HttpClientModule ],
  exports: [OverviewComponent]
})
export class OverviewModule { }
