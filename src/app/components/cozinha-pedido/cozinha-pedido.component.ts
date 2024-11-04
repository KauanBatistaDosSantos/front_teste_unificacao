import { Component, OnInit, Input } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmarFinalizacaoDoPedidoComponent } from '../dialog-confirmar-finalizacao-do-pedido/dialog-confirmar-finalizacao-do-pedido.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cozinha-pedido',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatTooltipModule],
  templateUrl: './cozinha-pedido.component.html',
  styleUrl: './cozinha-pedido.component.css'
})
export class CozinhaPedidoComponent {
  @Input() pedido: any;

  constructor(private pedidoService: PedidoService, public dialog: MatDialog, private router: Router) {}

  aceitarPedido(id: number): void {
    this.pedidoService.aceitarPedido(id).subscribe(() => {
      this.pedido.status = 'em preparo';
      console.log('Pedido aceito com sucesso:', this.pedido);
    });
    setTimeout(() => {
    window.location.reload(); 
    }, 100);
  }

  finalizarPedido(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmarFinalizacaoDoPedidoComponent);

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado && this.pedido && this.pedido.id === id) {
        this.pedido.status = 'aguardando entrega';
        console.log('Finalizando pedido com ID:', id);

        this.pedidoService.updatePedido(id, this.pedido).subscribe(() => {
          console.log('Pedido atualizado com sucesso:', this.pedido);
          setTimeout(() => {
            window.location.reload(); 
            }, 100);
        }, (error) => {
          console.error('Erro ao atualizar o pedido:', error);
        });
      }
    });
  }
}