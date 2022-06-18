import { Component, OnInit } from '@angular/core';
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
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.search('');
  }

  search(query: string) {
    this.searchService.search(query).subscribe(
      (data: IResponseHttpModel) => {
        this.products = data.body.results;
      }
    );
  }

}
