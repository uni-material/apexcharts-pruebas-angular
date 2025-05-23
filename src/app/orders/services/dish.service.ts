import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Dish} from '../model/dishes.entity';
import {environment} from '../../../environments/environment';

const dishResourceEndpointPath = environment.dishesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class DishService extends BaseService<Dish>{

  constructor() {
    super();
    this.resourceEndpoint = dishResourceEndpointPath;
  }
}
