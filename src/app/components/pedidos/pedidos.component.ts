import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    // Obtém a lista de pedidos com apenas os campos necessários
    this.pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos.map(pedido => ({
        id: pedido.id,
        nomeCliente: pedido.nomeCliente,
        status: pedido.status
      }));
    });
  }

  verDetalhes(id: string) {
    this.router.navigate(['/acompanhar-pedido', id]);
  }
}
