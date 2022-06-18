import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './modules/product-card/product-card.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCardModule
  ],
  exports: [
    ProductCardModule
  ]
})
export class SharedModule { }
