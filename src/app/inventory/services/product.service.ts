import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product.entity';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(environment.serverBaseUrlProducts);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.serverBaseUrlProducts, product);
  }

  getTotalCostByWeekday(): Observable<{ [day: string]: number }> {
    return this.getProducts().pipe(
      map(products => {
        // Inicializamos acumuladores para cada día de la semana
        const totalsByDay: { [key: string]: number } = {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0
        };

        products.forEach(product => {
          // Parseamos la fecha de expiración
          const date = new Date(product.expiration_date);

          // Obtenemos el día de la semana (0 = domingo, 1 = lunes, ...)
          const dayIndex = date.getUTCDay();

          // Mapeamos el índice a nombre del día
          // Domingo=0, Lunes=1 ... para ajustar los nombres:
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayName = dayNames[dayIndex];

          // Acumulamos el costo total: price * stock
          totalsByDay[dayName] += product.price * product.stock;
        });

        return totalsByDay;
      })
    );
  }
}
