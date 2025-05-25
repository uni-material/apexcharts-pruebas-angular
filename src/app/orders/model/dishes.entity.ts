export class Dish {

  id: number;
  name: string;
  price: number;

  constructor(dishData: {
    id?: number,
    name?: string,
    price?: number,
  }) {

    this.id = dishData.id || 0;
    this.name = dishData.name || '';
    this.price = dishData.price || 0;
  }
}
