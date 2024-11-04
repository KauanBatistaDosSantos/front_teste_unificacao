import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private cartUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  addToCart(dish: Dish): Observable<Dish> {
    const dishWithId = { ...dish, id: crypto.randomUUID() }; 
    console.log('Adicionando ao carrinho com id único:', dishWithId);
    return this.http.post<Dish>(this.cartUrl, dishWithId);
  }

  getCartItems(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.cartUrl);
  }

  removeFromCart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`); 
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.cartUrl);
  }
}
