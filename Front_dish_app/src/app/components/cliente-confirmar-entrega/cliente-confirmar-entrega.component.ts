import { Component, OnInit, Input } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoStatusService } from '../../services/pedido-status.service';

@Component({
  selector: 'app-cliente-confirmar-entrega',
  standalone: true,
  imports: [],
  templateUrl: './cliente-confirmar-entrega.component.html',
  styleUrl: './cliente-confirmar-entrega.component.css'
})
export class ClienteConfirmarEntregaComponent implements OnInit {
  @Input() pedidoId!: string;
  @Input() codigoConfirmacao!: string;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    if (!this.codigoConfirmacao) {
      this.codigoConfirmacao = this.pedidoService.getCodigoConfirmacao();
    }

    if (!this.pedidoId) {
      this.pedidoId = this.pedidoService.getPedidoId() || localStorage.getItem('pedidoId') || '';
    }

    if (!this.pedidoId) {
      console.error('ID do pedido não está definido após todas as tentativas');
    }
  }

  pedidoConcluido() {
    if (this.pedidoId) {
      this.pedidoService.getPedidoById(+this.pedidoId).subscribe(pedido => {
        if (pedido.status === 'pedido enviado para entrega') {
          this.pedidoService.finalizarPedidoCliente(+this.pedidoId).subscribe(() => {
            console.log('Pedido concluído');
          });
        } else {
          console.error('O pedido não está pronto para ser finalizado');
        }
      });
    } else {
      console.error('ID do pedido não está definido');
    }
  }
}