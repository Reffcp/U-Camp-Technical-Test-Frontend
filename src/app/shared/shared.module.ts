import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './modules/product-card/product-card.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCardModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ProductCardModule,
    MaterialModule
  ]
})
export class SharedModule { }
