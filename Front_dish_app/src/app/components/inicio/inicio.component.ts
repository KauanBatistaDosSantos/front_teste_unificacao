import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [CommonModule, MatSidenavModule, MatButtonModule] 
})
export class InicioComponent implements OnInit {
  showFiller = false;
  totalDishes: number = 0; 
  menuOpen: boolean = false; 
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

  

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
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
