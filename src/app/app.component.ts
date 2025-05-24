import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import {OrdersAnalyticsComponent} from './analytics/components/orders-analytics/orders-analytics.component';
import {ProfitsAnalyticsComponent} from './analytics/components/profits-analytics/profits-analytics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrdersAnalyticsComponent, ProfitsAnalyticsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'segundaversionfrontend';
}
