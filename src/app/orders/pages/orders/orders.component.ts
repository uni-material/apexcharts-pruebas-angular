import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderCardComponent} from '../../components/order-card/order-card.component';
import {CommonModule} from '@angular/common';
import {OrderFormComponent} from '../../components/order-form/order-form.component';


@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    OrderCardComponent,
    OrderFormComponent,


  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  @ViewChild('orderCard') orderCardComponent!: OrderCardComponent;

  onNewOrder() {
    if (this.orderCardComponent) {
      this.orderCardComponent.loadData();
    }
  }
}
