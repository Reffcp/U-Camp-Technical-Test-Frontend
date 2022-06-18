import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(query: string, limit: number, offset: number, itemCondition: string | null, orderBy: string | null): Observable<any> {
    return this.http.get(`${API_URL}/search?query=${query}&limit=${limit}&offset=${offset}${(itemCondition !== null) ? `&item_condition=${itemCondition}` : ''}${(orderBy !== null) ? `&sort=${orderBy}` : ''}`);
  }
}
