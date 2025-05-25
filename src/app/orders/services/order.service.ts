import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Order} from '../model/order.entity';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';

const ordersResourceEndpointPath = environment.ordersEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order>{

  constructor() {
    super();
    this.resourceEndpoint = ordersResourceEndpointPath;
  }


  getProfitsPerDay(): Observable<{ day: string, profit: number }[]> {
    return this.http.get<Order[]>(`${environment.serverBaseUrl}${ordersResourceEndpointPath}`).pipe(
      map((orders: Order[]) => {
        const profitsMap = new Map<string, number>();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (const order of orders) {
          const date = new Date(order.createdAt);
          const day = daysOfWeek[date.getDay()];
          const prev = profitsMap.get(day) || 0;
          profitsMap.set(day, prev + order.total);
        }


        return daysOfWeek.map(day => ({
          day,
          profit: profitsMap.get(day) || 0
        }));
      })
    );
  }


}
