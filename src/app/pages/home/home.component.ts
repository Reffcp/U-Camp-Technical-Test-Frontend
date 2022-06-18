import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/core/services/search/search.service';
import { IResponseHttpModel } from 'src/app/shared/models/general.model';
import { IProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: IProductModel[] = [];

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) { }

  // ngOnChanges(): void {
  //   this.ngOnInit();
  // }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params: any) => {
        console.log(params.params.busqueda);

        if (params.params) {
          this.search(params.params.busqueda);
        } else {
          this.search('');
        }
      }
    );
  }

  search(query: string) {
    this.searchService.search(query).subscribe(
      (data: IResponseHttpModel) => {
        this.products = data.body.results;
      }
    );
  }

}
