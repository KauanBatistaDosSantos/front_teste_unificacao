import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service'; 
import { ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../services/pedidos.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-teste-pedido',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './teste-pedido.component.html',
  styleUrl: './teste-pedido.component.css'
})
export class TestePedidoComponent implements OnInit {
  dish: Dish | null = null;
  loading = true;
  id: string | null = null;

  constructor(
    private dishService: DishService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute, 
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.dishService.getDish(this.id).subscribe( 
        data => {
          this.dish = data;
          this.loading = false;
        },
        error => {
          console.error('Erro ao carregar prato', error);
          this.loading = false;
        }
      );
    } else {
      console.error('ID não fornecido na rota');
      this.loading = false;
    }
  }

  addToCart(): void {
    if (this.dish) {
      this.carrinhoService.addToCart(this.dish);
      console.log('Prato adicionado ao carrinho (local):', this.dish);
    } else {
      console.error('Prato não encontrado para adicionar ao carrinho');
    }
    this.router.navigate(['/cardapio']);
  }

  voltar() {
    this.location.back();
   }
}