import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderCardComponent} from '../../components/order-card/order-card.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    OrderCardComponent,


  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
