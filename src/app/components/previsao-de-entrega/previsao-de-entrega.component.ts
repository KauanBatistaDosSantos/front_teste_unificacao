import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-previsao-de-entrega',
  standalone: true,
  imports: [],
  templateUrl: './previsao-de-entrega.component.html',
  styleUrl: './previsao-de-entrega.component.css'
})
export class PrevisaoDeEntregaComponent implements OnInit {
  @Input() pedido: any;
  previsaoChegada: string = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    if (this.pedido && this.pedido.tempoEstimado) {
      const agora = new Date();
      const estimativa = new Date(agora.getTime() + this.pedido.tempoEstimado * 60000);
      this.previsaoChegada = estimativa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      console.log('Tempo estimado de chegada calculado:', this.previsaoChegada);
    } else {
      console.warn('Pedido ou tempoEstimado não fornecido.');
    }
  }
}
