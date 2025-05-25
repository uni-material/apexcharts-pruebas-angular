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

  // Este método será llamado por el componente padre cuando una nueva orden se cree
  public loadData(): void {
    this.http.get<any[]>(`${environment.serverBaseUrl}${environment.ordersEndpointPath}`).subscribe((ordersData) => {
      // Mapeo de las órdenes desde la respuesta del backend
      this.orders = ordersData.map(o => new Order({
        id: o.id, // Simplificado: ahora solo leemos 'id'
        restaurantId: o.restaurant_id, // Mapeo de snake_case a camelCase para el modelo
        tableNumber: o.table_number,   // Mapeo de snake_case a camelCase para el modelo
        total: o.total,
        createdAt: new Date(o.createdAt) // Convertir string de fecha a objeto Date
      }));

      // Cargar platos
      this.http.get<any[]>(`${environment.serverBaseUrl}${environment.dishesEndpointPath}`).subscribe((dishesData) => {
        this.dishes = dishesData.map(d => new Dish({
          id: d.dish_id, // El modelo Dish usa 'id', pero db.json tiene 'dish_id'
          name: d.name,
          price: d.price
        }));

        // Cargar los detalles de platos por orden (orders_dishes)
        this.http.get<any[]>(`${environment.serverBaseUrl}${environment.orderDishesEndpointPath}`).subscribe((odData) => {
          this.orderDishes = odData.map(od => new OrderDish({
            order_id: od.order_id,
            dish_id: od.dish_id,
            quantity: od.quantity,
            subtotal: od.subtotal
          }));

          this.buildOrderViews(); // Construir la vista combinada para las tarjetas
        });
      });
    });
  }

  buildOrderViews(): void {
    this.orderViews = this.orders.map(order => {
      // Filtrar los platos correspondientes a la orden actual
      // order.id es el ID de la orden actual (ej: 1, 2, 3...)
      // od.order_id es la clave foránea en orders_dishes que referencia a orders.id
      const relatedOrderDishes = this.orderDishes.filter(od => od.order_id === order.id);

      const dishesInfo = relatedOrderDishes.map(rod => {
        const dish = this.dishes.find(d => d.id === rod.dish_id); // d.id es el dish_id mapeado
        return {
          name: dish ? dish.name : 'Plato Desconocido',
          quantity: rod.quantity,
          subtotal: rod.subtotal
        };
      });

      return { order, dishes: dishesInfo };
    })
      // Ordenar las vistas de órdenes por fecha de creación, las más recientes primero
      .sort((a, b) => b.order.createdAt.getTime() - a.order.createdAt.getTime());
  }


}
