import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PedidoService } from '../../services/pedido.service';

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
  totalOutStock: number = 0;
  totalOrder: number = 0;
  pedidosEmPreparo: any[] = [];
  pedidosAguardandoEntrega: any[] = [];
  dishes: Dish[] = []; // Declare `dishes` array

  constructor(
    private router: Router,
    private dishService: DishService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.carregarQuantidadeDePratos();
    this.carregarPedidosPreparo();
    this.carregarPedidos();
    this.pratosForaEstoque();
  }

  carregarQuantidadeDePratos(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes: Dish[]) => {
        this.dishes = dishes;
        this.totalDishes = dishes.length;
      },
      error: (err) => {
        console.error('Erro ao carregar pratos:', err);
        this.totalDishes = 0;
      }
    });
  }

  carregarPedidosPreparo(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos: any[]) => {
        const pedidosEmPreparo = pedidos.filter(pedido => pedido.status === 'em preparo');
        this.totalOrder = pedidosEmPreparo.length;
        this.pedidosEmPreparo = pedidosEmPreparo;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos em preparo:', err);
        this.totalOrder = 0;
        this.pedidosEmPreparo = [];
      }
    });
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos: any[]) => {
        this.pedidosAguardandoEntrega = pedidos
          .filter(pedido => pedido.status === 'aguardando entrega')
          .map(pedido => ({
            id: pedido.id,
            nomeCliente: pedido?.cliente?.nome || 'Cliente não identificado',
            status: pedido.status
          }));
        console.log('Pedidos aguardando entrega:', this.pedidosAguardandoEntrega);
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
      }
    });
  }

  pratosForaEstoque(): void {
    this.totalOutStock = this.dishes.filter(
      (dish) => dish.stock === 0
    ).length;
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
