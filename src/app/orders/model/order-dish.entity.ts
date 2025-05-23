export class OrderDish {
  order_id: number;
  dish_id: number;
  quantity: number;
  subtotal: number;

  constructor(data: { order_id?: number; dish_id?: number; quantity?: number; subtotal?: number }) {
    this.order_id = data.order_id || 0;
    this.dish_id = data.dish_id || 0;
    this.quantity = data.quantity || 0;
    this.subtotal = data.subtotal || 0;
  }
}
