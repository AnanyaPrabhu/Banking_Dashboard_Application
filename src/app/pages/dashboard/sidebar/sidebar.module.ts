import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarModule as PrimeSidebar } from 'primeng/sidebar';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule, RouterModule, PrimeSidebar
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
