import { Injectable } from '@angular/core';
import { Dish } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private cartKey = 'cart';

  constructor() {}

  addToCart(dish: Dish): void {
    const cart = this.getCartItems();
    cart.push(dish);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  getCartItems(): Dish[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(id: string): void {
    const cart = this.getCartItems().filter(dish => dish.id !== id);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
