
export class Product {
  product_id: number;
  inventory_id: number;
  name: string;
  expiration_date: string;  // ISO string
  stock: number;
  measurement_unit: string;
  price: number;

  constructor(data: {product_id: number, inventory_id: number, name: string, expiration_date: string, stock: number, measurement_unit: string, price: number}) {
    this.product_id = data.product_id;
    this.inventory_id = data.inventory_id;
    this.name = data.name;
    this.expiration_date = data.expiration_date;
    this.stock = data.stock;
    this.measurement_unit = data.measurement_unit;
    this.price = data.price;
  }


}
