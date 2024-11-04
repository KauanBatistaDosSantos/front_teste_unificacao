import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  activeDishes: Dish[] = [];
  inactiveDishes: Dish[] = [];

  constructor(private dishService: DishService, private router: Router, private location:Location) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.filterDishes();
    });
  }

  filterDishes() {
    this.activeDishes = this.dishes.filter(dish => dish.status === 'ativo');
    this.inactiveDishes = this.dishes.filter(dish => dish.status === 'inativo');
  }

  toggleStatus(dish: Dish) {
    const updatedStatus = dish.status === 'ativo' ? 'inativo' : 'ativo';
    const updatedDish = { ...dish, status: updatedStatus };
    
    this.dishService.updateDish(dish.id, updatedDish).subscribe(() => {
      dish.status = updatedStatus;
      this.filterDishes(); // Atualizar listas de pratos
    });
  }

  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.loadDishes();
    });
  }

  editDish(id: string) {
    this.router.navigate(['/dish-form', id]);
  }

  voltar() {
    this.router.navigate(['/gerencia']);
  }
}