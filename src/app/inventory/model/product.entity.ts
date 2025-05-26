
export class Product {
  id: number;
  inventory_id: number;
  name: string;
  expiration_date: string;  // ISO string
  stock: number;
  measurement_unit: string;
  price: number;

  constructor(data: {id: number, inventory_id: number, name: string, expiration_date: string, stock: number, measurement_unit: string, price: number}) {
    this.id = data.id;
    this.inventory_id = data.inventory_id;
    this.name = data.name;
    this.expiration_date = data.expiration_date;
    this.stock = data.stock;
    this.measurement_unit = data.measurement_unit;
    this.price = data.price;
  }


}
