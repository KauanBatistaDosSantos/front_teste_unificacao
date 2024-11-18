import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(
      (pedidos) => {
        console.log('Pedidos recebidos:', pedidos);
        this.pedidos = pedidos.map(pedido => ({
          id: pedido.id,
          nomeCliente: pedido.cliente.nome,
          status: pedido.status
        }));
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error);
      }
    );
  }

  verDetalhes(id: string) {
    this.router.navigate(['/acompanhar-pedido', id]);
  }

  voltar() {
    this.location.back();
  }
}