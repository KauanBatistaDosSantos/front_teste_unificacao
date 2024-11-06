import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Category  {
  name: string;
  dishes: Dish[];
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = `${environment.apiUrl}/dishes`;

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    dish.id = String(dish.id);
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: string, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}/atualizarPrato`, dish);
  }

  deleteDish(id: string): Observable<Dish> {
    return this.http.delete<Dish>(`${this.apiUrl}/${id}`);
  }

  getDishesByCategory(category: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/category/${category}`);
  }

  mudarStock(valor: number, id: string): Observable<Dish> { 
    return this.http.put<Dish>(`${this.apiUrl}/${id}/atualizarEstoque?valor=${valor}`, {});
  }  
}