import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { CommonModule, Location } from '@angular/common';
import { Dish } from '../../services/dish.service';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  cart: Dish[] = [];
  loading: boolean = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router, 
    private location: Location
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loading = false;
  }

  loadCartItems() {
    this.cart = this.carrinhoService.getCartItems();
  }

  removeFromCart(id: string) {
    this.carrinhoService.removeFromCart(id);
    this.cart = this.cart.filter(dish => dish.id !== id);
  }

  get total(): number {
    return this.cart.reduce((sum, dish) => sum + (dish.price || 0), 0);
  }

  voltar() {
    this.router.navigate(['/cardapio']);
  }

  finalizar() {
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.router.navigate(['/finalizar-pedido']);
  }
}