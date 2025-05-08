import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdComponent } from './fd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [
    FdComponent
  ],
  imports: [
    ToastModule,
    DialogModule,
    FormsModule,
    CommonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    ButtonModule
  ],
  exports: [FdComponent]
})
export class FdModule { }
