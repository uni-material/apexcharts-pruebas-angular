import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../model/order.entity';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {CommonModule, DatePipe, NgForOf} from '@angular/common';
import {Dish} from '../../model/dishes.entity';
import {OrderDish} from '../../model/order-dish.entity';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

interface OrderView {
  order: Order;
  dishes: {
    name: string;
    quantity: number;
    subtotal: number;
  }[];
}

@Component({
  selector: 'app-order-card',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardModule,
    MatCardContent,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './order-card.component.html',
  standalone: true,
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent implements OnInit{
  orders: Order[] = [];
  dishes: Dish[] = [];
  orderDishes: OrderDish[] = [];
  orderViews: OrderView[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<any[]>(`${environment.serverBaseUrl}${environment.ordersEndpointPath}`).subscribe((ordersData) => {
      this.orders = ordersData.map(o => new Order({
        id: o.order_id,
        restaurantId: o.restaurant_id,
        tableNumber: o.table_number,
        total: o.total,
        createdAt: new Date(o.createdAt)
      }));

      this.http.get<any[]>(`${environment.serverBaseUrl}${environment.dishesEndpointPath}`).subscribe((dishesData) => {
        this.dishes = dishesData.map(d => new Dish({
          id: d.dish_id,
          name: d.name,
          price: d.price
        }));

        this.http.get<any[]>(`${environment.serverBaseUrl}${environment.orderDishesEndpointPath}`).subscribe((odData) => {
          this.orderDishes = odData.map(od => new OrderDish(od));

          this.buildOrderViews();
        });
      });
    });
  }

  buildOrderViews(): void {
    this.orderViews = this.orders.map(order => {
      const relatedOrderDishes = this.orderDishes.filter(od => od.order_id === order.id);
      const dishesInfo = relatedOrderDishes.map(rod => {
        const dish = this.dishes.find(d => d.id === rod.dish_id);
        return {
          name: dish ? dish.name : 'Desconocido',
          quantity: rod.quantity,
          subtotal: rod.subtotal
        };
      });

      return { order, dishes: dishesInfo };
    });
  }


}
