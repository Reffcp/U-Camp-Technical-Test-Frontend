import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './modules/product-card/product-card.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCardModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductCardModule
  ]
})
export class SharedModule { }
