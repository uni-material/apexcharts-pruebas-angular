import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dish} from '../../model/dishes.entity';
import {DishService} from '../../services/dish.service';
import {OrderService} from '../../services/order.service';
import {OrderDishService} from '../../services/order-dish.service';
import {Order} from '../../model/order.entity';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {OrderDish} from '../../model/order-dish.entity';

@Component({
  selector: 'app-order-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    DecimalPipe,

  ],
  templateUrl: './order-form.component.html',
  standalone: true,
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{
  form: FormGroup;
  dishes: Dish[] = [];

  @Output() orderCreated = new EventEmitter<void>(); // Evento para notificar la creación de una orden

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private orderService: OrderService,
    private orderDishService: OrderDishService
  ) {
    this.form = this.fb.group({
      tableNumber: [null, [Validators.required, Validators.min(1)]],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadDishes();
    this.addDish(); // Añade una fila por defecto para un plato
  }

  loadDishes() {
    this.dishService.getAllDishes().subscribe(data => {
      this.dishes = data;
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addDish() {
    this.items.push(this.fb.group({
      dishId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeDish(index: number) {
    if (this.items.length > 1) { // Evita remover la última fila si así lo deseas
      this.items.removeAt(index);
    }
  }

  calculateTotal(): number {
    let total = 0;
    this.items.controls.forEach(group => {
      const dishSelected = this.dishes.find(d => d.id === group.value.dishId);
      const quantity = group.value.quantity || 0;
      total += (dishSelected?.price || 0) * quantity;
    });
    return total;
  }

  submit() {
    if (this.form.invalid) {
      // Marcar todos los campos como tocados para mostrar errores de validación si es necesario
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const calculatedTotal = this.calculateTotal();
    const currentDate = new Date();

    // Payload para la orden con snake_case
    const newOrderPayload = {
      restaurant_id: 1, // Asumiendo restaurant_id fijo, ajústalo si es dinámico
      table_number: formValue.tableNumber,
      total: calculatedTotal,
      createdAt: currentDate.toISOString()
      // No envíes 'id' u 'order_id', json-server lo generará
    };

    // @ts-ignore
    this.orderService.create(newOrderPayload).subscribe({
      next: (orderCreatedResponse: any) => {
        const newOrderId = orderCreatedResponse.id; // Este es el ID generado por json-server

        if (newOrderId === undefined) {
          console.error('Error: El ID de la orden creada es undefined. Revisa la respuesta de json-server.');
          // Aquí podrías mostrar un mensaje de error al usuario
          return;
        }

        const orderDishesPromises: Promise<any>[] = [];

        this.items.value.forEach((item: any) => {
          const dish = this.dishes.find(d => d.id === item.dishId);
          if (dish) {
            const subtotal = dish.price * item.quantity;
            const orderDishPayload = new OrderDish({
              order_id: newOrderId,
              dish_id: item.dishId,
              quantity: item.quantity,
              subtotal: subtotal
            });
            // Agregamos la promesa del servicio create a un array
            orderDishesPromises.push(
              new Promise((resolve, reject) => {
                this.orderDishService.create(orderDishPayload).subscribe({
                  next: resolve,
                  error: reject
                });
              })
            );
          }
        });

        // Esperar a que todos los 'order_dishes' se creen
        Promise.all(orderDishesPromises).then(() => {
          console.log('Orden y todos los platos de la orden creados exitosamente.');
          this.form.setControl('items', this.fb.array([]));
          this.form.get('tableNumber')?.reset();
          this.addDish(); // Añadir una nueva fila vacía
          // Añadir una fila vacía para la siguiente orden
          this.orderCreated.emit(); // Emitir evento para notificar al componente padre
        }).catch(error => {
          console.error('Error al crear uno o más OrderDish:', error);
          // Aquí podrías manejar el error, por ejemplo, intentando eliminar la orden creada si los platos fallan
        });

      },
      error: (err) => {
        console.error('Error al crear la orden principal:', err);
        // Mostrar mensaje de error al usuario
      }
    });
  }





}
