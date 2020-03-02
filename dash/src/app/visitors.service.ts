import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IByCountry} from './by-country';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(private http: HttpClient) { }

	getByCountry(page: string) {
		return this.http.get<IByCountry[]>(`/api/visitors/country/${page}`);
	}

	getReturns(page: string) {
		return this.http.get<number>(`/api/visitors/returns/${page}?day=1`);
	}

	getRecent(page: string) {
		return this.http.get<number>(`/api/visitors/recent/${page}?min=30`);
	}
}
