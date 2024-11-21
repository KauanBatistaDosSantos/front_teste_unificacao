import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../services/dish.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  totalDishes: number = 0; 

  constructor(
    private router: Router,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    this.carregarQuantidadeDePratos();
  }

  carregarQuantidadeDePratos(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes: Dish[]) => {
        this.totalDishes = dishes.length; 
      },
      error: (err) => {
        console.error('Erro ao carregar pratos:', err);
        this.totalDishes = 0;
      }
    });
  }

  irParaCardapio() {
    this.router.navigate(['/cardapio']);
  }

  irParaGerencia() {
    this.router.navigate(['/gerencia']);
  }

  irParaCozinha() {
    this.router.navigate(['/tela-cozinha']);
  }

  irParaEntregador() {
    this.router.navigate(['/painel-entregadores']);
  }
}
