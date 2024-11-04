import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../services/dish.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-porcoes',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './porcoes.component.html',
  styleUrl: './porcoes.component.css'
})
export class PorcoesComponent implements OnInit {
  dishes: any[] = [];
  loading = true;

  constructor(private dishService: DishService, private location: Location, private router: Router) {}

  ngOnInit() {
    this.dishService.getDishesByCategory('porcoes').subscribe(data => {
      this.dishes = data;
      this.loading = false;
    }, error => {
      console.error('Erro ao carregar pratos', error);
      this.loading = false;
    });
  }
  
  verDetalhes(id: number | undefined) {
    if (id !== undefined) {
        this.router.navigate(['/cardapio/fazer-pedido', id.toString()]);
    } else {
        console.error('ID do prato não encontrado');
    }
  }

  voltar() {
    this.location.back();
  }

  verPedidos() {
    this.router.navigate(['acompanhar-pedido']);
  }

  meusPedidos() {
    this.router.navigate(['meus-pedidos']);
  }
}