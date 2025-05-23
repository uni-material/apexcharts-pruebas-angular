import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Order} from '../model/order.entity';
import {environment} from '../../../environments/environment';

const ordersResourceEndpointPath = environment.ordersEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order>{

  constructor() {
    super();
    this.resourceEndpoint = ordersResourceEndpointPath;
  }
}
