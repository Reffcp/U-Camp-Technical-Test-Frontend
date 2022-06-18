import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/core/services/search/search.service';
import { IItemFilterCondition, IItemSortCondition, IPagingModel, IResponseHttpModel } from 'src/app/shared/models/general.model';
import { IProductModel } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: IProductModel[] = [];
  allResponseSearch: any = [];
  pageSize: number = 0;
  limit: number = 30;
  offset: number = 0;
  searching: string = '';
  filters: IItemFilterCondition[] = [];
  ordersByCost: IItemSortCondition[] = [];
  itemConditionSelected: string = '';
  orderConditionSelected: string = '';
  isFirstLoad: boolean = true;

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
          this.searching = params.params.busqueda;
          this.search(params.params.busqueda, this.itemConditionSelected, this.orderConditionSelected);
        } else {
          this.search('', this.itemConditionSelected, this.orderConditionSelected);
        }
      }
    );
  }

  // metodo para filtrar los productos por nuevo o usado
  filterByCondition(condition: string) {
    if (condition !== '') {
      this.itemConditionSelected = condition;
      this.search(this.searching, condition, this.orderConditionSelected);
    } else {
      this.search(this.searching, this.itemConditionSelected, this.orderConditionSelected);
    }
  }

  createFiltersAndSorts(): void {
    this.allResponseSearch.available_filters.forEach((filter: any) => {
      if (filter.id === environment.item_condition) {
        filter.values.forEach((value: IItemFilterCondition) => {
          this.filters.push(value);
        });
      }
    }
    );
    this.allResponseSearch.available_sorts.forEach((filter: any) => {
      this.ordersByCost.push(filter);
    }
    );
  }


  search(query: string, itemCondition: string, orderBy: string): void {
    this.searchService.search(query, this.limit, this.offset, (itemCondition !== '') ? itemCondition : null, (orderBy !== '') ? orderBy : null).subscribe(
      (data: IResponseHttpModel) => {
        this.pageSize = data.body.paging.total;
        this.products = [];
        this.allResponseSearch = null;
        if (this.isFirstLoad) {
          this.isFirstLoad = false;
          this.allResponseSearch = data.body;
          this.createFiltersAndSorts();
        }
        data.body.results.forEach((product: any) => {
          this.products.push(product);
        }
        );
      }
    );
  }

  // metodo para ordenar los productos de mayor a menor por precio o viceversa
  orderByPrice(order: string) {
    if (order !== '') {
      this.orderConditionSelected = order;
      this.search(this.searching, this.itemConditionSelected, order);
    } else {
      this.search('', this.itemConditionSelected, order);
    }
  }

  changePage(page: any) {
    let paging: IPagingModel = page;
    this.offset = paging.pageIndex * paging.pageSize;
    this.getParams();
  }

}
