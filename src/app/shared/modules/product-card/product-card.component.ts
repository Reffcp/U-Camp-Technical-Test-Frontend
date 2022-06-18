import { Component, Input, OnInit } from '@angular/core';
import { IProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product?: IProductModel;

  constructor() { }

  ngOnInit(): void {
  }

  validateProductCondition(condition: string): string {
    if (condition === 'new') {
      return 'Nuevo';
    } else if (condition === 'used') {
      return 'Usado';
    } else {
      return 'Nuevo';
    }
  }
}
