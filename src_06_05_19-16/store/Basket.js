import { makeAutoObservable } from "mobx";

class Basket {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    console.log('id',id)
    console.log('len',this.items.length)
    console.log('this.items[0].id',this.items[0].id)
    this.items = this.items.filter((item) => item.id !== id);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const basket = new Basket();
export default basket;