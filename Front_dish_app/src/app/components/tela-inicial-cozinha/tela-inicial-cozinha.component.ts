import { Component, OnInit } from '@angular/core';
import { CozinhaPedidoComponent } from '../cozinha-pedido/cozinha-pedido.component';
import { PedidoService } from '../../services/pedido.service';
import { NgFor, NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tela-inicial-cozinha',
  standalone: true,
  imports: [CozinhaPedidoComponent, NgFor, NgForOf, MatIcon, MatIconModule],
  templateUrl: './tela-inicial-cozinha.component.html',
  styleUrl: './tela-inicial-cozinha.component.css'
})
export class TelaInicialCozinhaComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      console.log('Pedidos carregados do backend:', data);
      this.pedidos = data
        .filter(pedido => pedido.status === 'não aceito' || pedido.status === 'em preparo')
        .map((pedido) => {
          const dataPedido = new Date(pedido.data);
          return {
            ...pedido,
            horario: dataPedido,
            tempo: this.calcularTempo(dataPedido)
          };
        })
        .sort((a, b) => {
          if (a.status === 'em preparo' && b.status === 'em preparo') {
            return new Date(a.horario).getTime() - new Date(b.horario).getTime();
          }
          if (a.status === 'em preparo') return -1;
          if (b.status === 'em preparo') return 1;
  
          return new Date(a.horario).getTime() - new Date(b.horario).getTime();
        });
    });
  }

  calcularTempo(horario: Date): string {
    const agora = new Date();
    const diferenca = agora.getTime() - horario.getTime();
    const minutos = Math.floor(diferenca / 60000);
    return `${minutos} min`;
  }

  voltar() {
    this.router.navigate(['inicio']);
  }
}