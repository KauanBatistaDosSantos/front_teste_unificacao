import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService, private router: Router, private location:Location) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
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
    this.router.navigate(['/inicio']);
  }
}