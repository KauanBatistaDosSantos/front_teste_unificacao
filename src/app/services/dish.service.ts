import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: string;
}

export interface Category  {
  name: string;
  dishes: Dish[];
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:3000/dishes';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    dish.id = String(dish.id);
    return this.getDishes().pipe(
      map(dishes => {
        const existingDish = dishes.find(d => d.id === dish.id);
        if (existingDish) {
          throw new Error(`Dish with ID ${dish.id} already exists.`);
        }
        return dish;
      }),
      switchMap(() => this.http.post<Dish>(this.apiUrl, dish)),
      catchError(error => throwError(() => new Error(error.message)))
    );
  }

  updateDish(id: string, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: string): Observable<Dish> {
    return this.http.delete<Dish>(`${this.apiUrl}/${id}`);
  }

  getDishesByCategory(category: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}?category=${category}`);
  }
}
