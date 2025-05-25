import {Order} from './order.entity';

interface OrderView {
  order: Order;
  dishes: {
    name: string;
    quantity: number;
    subtotal: number;
  }[];
}
