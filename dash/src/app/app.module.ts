import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartComponent } from './chart/chart.component';
import {VisitorsService } from './visitors.service';

const appRoutes: Routes = [
	{path: ':page', component: ChartComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(
			appRoutes,
		),
		HttpClientModule,
		NgxChartsModule,
  ],
  providers: [VisitorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
