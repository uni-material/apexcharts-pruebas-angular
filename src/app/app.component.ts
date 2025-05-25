import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import {OrdersAnalyticsComponent} from './analytics/components/orders-analytics/orders-analytics.component';
import {ProfitsAnalyticsComponent} from './analytics/components/profits-analytics/profits-analytics.component';
import {OrderPieAnalyticsComponent} from './analytics/components/order-pie-analytics/order-pie-analytics.component';
import {LossAnalyticsComponent} from './analytics/components/loss-analytics/loss-analytics.component';
import {OrderCardComponent} from './orders/components/order-card/order-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrdersAnalyticsComponent, ProfitsAnalyticsComponent, LossAnalyticsComponent, OrderPieAnalyticsComponent, OrderCardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'segundaversionfrontend';
}
