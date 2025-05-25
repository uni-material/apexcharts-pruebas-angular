import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Dish} from '../model/dishes.entity';
import {environment} from '../../../environments/environment';
import {catchError, map, Observable, retry} from 'rxjs';

const dishResourceEndpointPath = environment.dishesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class DishService extends BaseService<Dish>{

  constructor() {
    super();
    this.resourceEndpoint = dishResourceEndpointPath;
  }

  public getAllDishes(): Observable<Array<Dish>> {
    // Especifica 'any[]' para la respuesta cruda del HTTP GET
    return this.http.get<Array<any>>(this.resourcePath(), this.httpOptions).pipe(
      retry(2),
      map((rawDishes: any[]) => rawDishes.map(d => new Dish({ // Mapea a instancias de Dish
        id: d.dish_id, // Correcto: mapea dish_id de db.json a la propiedad id del modelo Dish
        name: d.name,
        price: d.price
      }))),
      catchError(this.handleError)
    );
  }

}
