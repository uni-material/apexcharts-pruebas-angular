import {Component, Input} from '@angular/core';
import {Order} from '../../model/order.entity';
import {CommonModule} from '@angular/common';
import {OrderCardComponent} from '../order-card/order-card.component';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './order-list.component.html',
  standalone: true,
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  @Input() orders: Order[] = [];

  trackById(index: number, order: Order): number | undefined {
    return order.id;
  }

}
