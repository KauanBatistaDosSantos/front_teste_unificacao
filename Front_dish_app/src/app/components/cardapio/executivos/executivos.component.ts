import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../services/dish.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { PedidoService } from '../../pedido.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-executivos',
  standalone: true,
  imports: [CommonModule, MatIcon, MatBadgeModule],
  templateUrl: './executivos.component.html',
  styleUrl: './executivos.component.css'
})
export class ExecutivosComponent implements OnInit {
  dishes: any[] = [];
  loading = true;
  cartHasItems = false;
  totalItens: number = 0;

  constructor(private dishService: DishService, 
    private location: Location, 
    private router: Router, 
    private pedidosService: PedidosService,
    private pedidoService: PedidoService, 
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.dishService.getDishesByCategory('executivos').subscribe(data => {
      this.dishes = data.filter(dish => dish.stock === 1);
      this.loading = false;
    }, error => {
      console.error('Erro ao carregar pratos', error);
      this.loading = false;
    });
    
    this.atualizarTotalItens();
  }
  
  atualizarTotalItens() {
    const itensCarrinho = this.carrinhoService.getCartItems();
    this.totalItens = itensCarrinho.length;
    this.cartHasItems = this.totalItens > 0;
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

 irParaCarrinho() {
  this.router.navigate(['/carrinho']);
 }
}
