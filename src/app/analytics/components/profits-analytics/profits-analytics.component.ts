import {Component, inject, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexFill, ChartComponent, NgApexchartsModule
} from 'ng-apexcharts';
import {OrderService} from '../../../orders/services/order.service';
import {NgIf} from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};


@Component({
  selector: 'app-profits-analytics',
  imports: [
    ChartComponent,
    NgIf,
    NgApexchartsModule,],
  templateUrl: './profits-analytics.component.html',
  standalone: true,
  styleUrl: './profits-analytics.component.css'
})
export class ProfitsAnalyticsComponent implements OnInit{

  public chartOptions: ChartOptions = {
    series: [{ name: 'Ganancia', data: [] }],
    chart: { type: 'area', height: 350 },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: { text: 'Ganancias Diarias del Restaurante', align: 'left' },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: { categories: [] }
  };

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getProfitsPerDay().subscribe(data => {
      this.chartOptions.series = [{
        name: 'Ganancia',
        data: data.map(item => item.profit)
      }];
      this.chartOptions.xaxis = {
        categories: data.map(item => item.day)
      };
    });
  }

}
