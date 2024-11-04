import { Component, OnInit } from '@angular/core';
import { EntregaRecebidaComponent } from '../entrega-recebida/entrega-recebida.component';
import { NgIf } from '@angular/common';
import { EntregaService } from '../../entrega.service';  // Importa o service
import { PedidoService } from '../pedido.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogEntregadorPedidoAtribuidoComponent } from '../dialog-entregador-pedido-atribuido/dialog-entregador-pedido-atribuido.component';
import { FinalizarEntregaComponent } from '../finalizar-entrega/finalizar-entrega.component';

@Component({
  selector: 'app-tela-inicial-entregador',
  standalone: true,
  imports: [EntregaRecebidaComponent, NgIf],
  templateUrl: './tela-inicial-entregador.component.html',
  styleUrl: './tela-inicial-entregador.component.css'
})
export class TelaInicialEntregadorComponent implements OnInit {
  nome: boolean = true;
  pedidoSelecionado: any;
  entregadorNome: string = '';
  mostrarPedido: boolean = false;

  constructor(
    private entregaService: EntregaService, 
    private pedidoService: PedidoService, 
    private route: ActivatedRoute, 
    private dialog: MatDialog) {}

  ngOnInit(): void {
    const nomeRota = this.route.snapshot.paramMap.get('nome');
    if (nomeRota) {
      this.entregadorNome = this.formatarNome(nomeRota);
    }

    this.buscarPedidoMaisAntigo();
  }

  abrirDialogNovoPedido(): void {
    if (!this.mostrarPedido) {
      const dialogRef = this.dialog.open(DialogEntregadorPedidoAtribuidoComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'iniciar') {
          this.mostrarPedido = true;
        }
      });
    }
  }

  buscarPedidoMaisAntigo(): void {
    this.pedidoService.getPedidoMaisAntigoParaEntregador(this.entregadorNome).subscribe(pedido => {
      if (pedido) {
        this.pedidoSelecionado = pedido;
        this.nome = true;
        this.mostrarPedido = false;
        this.abrirDialogNovoPedido();
      } else {
        this.pedidoSelecionado = null;
        this.nome = false;
      }
    });
  }

  finalizarEntrega(): void {
    if (this.pedidoSelecionado) {
      const dialogRef = this.dialog.open(FinalizarEntregaComponent);
      
      dialogRef.componentInstance.entregaFinalizada.subscribe(() => {

        this.buscarPedidoMaisAntigo();
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'entregaFinalizada') {
          this.buscarPedidoMaisAntigo();
        }
      });
    }
  }

  private formatarNome(nome: string): string {
    return nome
      .split('-')
      .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(' ');
  }
}
