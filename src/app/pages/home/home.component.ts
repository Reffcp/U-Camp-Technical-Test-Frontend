import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/core/services/search/search.service';
import { IPagingModel, IResponseHttpModel } from 'src/app/shared/models/general.model';
import { IProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: IProductModel[] = [];
  oldOrderProducts: any = [];
  pageSize: number = 0;
  limit: number = 30;
  offset: number = 0;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.activatedRoute.paramMap.subscribe(
      (params: any) => {
        if (params.params) {
          this.search(params.params.busqueda);
        } else {
          this.search('');
        }
      }
    );
  }

  search(query: string) {
    this.searchService.search(query, this.limit, this.offset).subscribe(
      (data: IResponseHttpModel) => {
        this.pageSize = data.body.paging.total;
        this.products = [];
        this.oldOrderProducts = [];
        data.body.results.forEach((product: any) => {
          this.products.push(product);
          this.oldOrderProducts.push(product);
        }
        );
      }
    );
  }

  // metodo para ordenar los productos de mayor a menor por precio o viceversa
  orderByPrice(order: string) {
    if (order === 'default') {
      this.products = [];
      this.oldOrderProducts.forEach((product: any) => {
        this.products.push(product);
      }
      );
    } else {
      this.products.sort((a, b) => {
        if (order === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      }
      );
    }
  }

  changePage(page: any) {
    let paging: IPagingModel = page;
    this.offset = paging.pageIndex * paging.pageSize;
    this.getParams();
  }

}
