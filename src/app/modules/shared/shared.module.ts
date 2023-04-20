import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';

const MODULES = [
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  CardComponent
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
