import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {OrderDish} from '../model/order-dish.entity';


const orderDishesEndpointPath = environment.orderDishesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderDishService extends BaseService<OrderDish>{

  constructor() {
    super();
    this.resourceEndpoint = orderDishesEndpointPath;
  }
}
