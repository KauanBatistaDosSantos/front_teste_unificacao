import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PedidoService } from '../../services/pedido.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [MatIcon, CommonModule, MatBadgeModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit {
  dishes: Dish[] = [];
  loading = true;
  totalItens: number = 0;

  constructor(
    private dishService: DishService, 
    private router: Router, 
    private location: Location,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.dishService.getDishesByCategory('porções').subscribe(data => {
      this.dishes = data; 
    });

    this.totalItens = this.carrinhoService.getCartItems().length;
  }

  irParaExecutivo() {
    this.router.navigate(['/cardapio/executivos']);
  }

  irParaBebidas(){
    this.router.navigate(['/cardapio/bebidas']);
  }

  irParaPorcoes(){
    this.router.navigate(['/cardapio/porcoes'])
  }

  navegarParaPrato(id: string) {
    this.router.navigate(['/prato', id]);
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  irParaCarrinho(){
    this.router.navigate(['/carrinho']);
   }
}
