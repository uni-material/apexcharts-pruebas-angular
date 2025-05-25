export class Order{

  id?: number;
  restaurantId: number;
  tableNumber: number;
  total: number;
  createdAt: Date;

  constructor(orderData: {
    id?: number,
    restaurantId?: number,
    tableNumber?: number,
    total?: number,
    createdAt?: Date,
  }) {

    this.id = orderData.id || 0;
    this.restaurantId = orderData.restaurantId || 0;
    this.tableNumber = orderData.tableNumber || 0;
    this.total = orderData.total || 0;
    this.createdAt = orderData.createdAt || new Date();

  }

}
