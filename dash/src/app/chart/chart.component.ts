import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {VisitorsService} from '../visitors.service';
import {IByCountry} from '../by-country';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	constructor(private readonly visitorsService: VisitorsService, private route: ActivatedRoute) {}

	single: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
	page: string = '';

  ngOnInit(): void {
		const page = this.route.snapshot.paramMap.get('page');

		this.getByCountry(page);
		this.getReturns(page);
		this.getRecent(page);
		this.page = page;
  }

	countryVisits: IByCountry[] = [];
	recent: number = 0;
	returns: number = 0;

	getRecent(page: string) {
		this.visitorsService.getRecent(page)
			.subscribe((data: number) => {
				this.recent = data;
			});
	}

	getReturns(page: string) {
		this.visitorsService.getReturns(page)
			.subscribe((data: number) => {
				this.returns = data;
			});
	}

	getByCountry(page: string) {
		this.visitorsService.getByCountry(page)
			.subscribe((data: IByCountry[]) => {
				this.single = [...data];
			});
	}

}
