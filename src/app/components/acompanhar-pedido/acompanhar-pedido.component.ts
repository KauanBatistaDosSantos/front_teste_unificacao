import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { PedidoStatusService } from '../pedido-status.service';
import { ClienteConfirmarEntregaComponent } from '../cliente-confirmar-entrega/cliente-confirmar-entrega.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acompanhar-pedido',
  standalone: true,
  imports: [MatIconModule, ClienteConfirmarEntregaComponent, NgIf
  ],
  templateUrl: './acompanhar-pedido.component.html',
  styleUrl: './acompanhar-pedido.component.css'
})
export class AcompanharPedidoComponent {
  statusAtual: string = '';
  entregaConfirmada: boolean = false;

  constructor(private pedidoStatusService: PedidoStatusService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoStatusService.status$.subscribe((status) => {
      this.statusAtual = status;

      if (status === 'Pedido concluído') {
        this.entregaConfirmada = true;
      }
    });
  }

  prepararPedido() {
    this.pedidoStatusService.atualizarStatus('Pedido sendo preparado');
  }

  pedidoEnviado() {
    this.pedidoStatusService.atualizarStatus('Pedido enviado para entrega');
  }

  voltar() {
    this.router.navigate(['inicio']);
  }
}
