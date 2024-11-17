import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-atribuindo-entregador',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './atribuindo-entregador.component.html',
  styleUrl: './atribuindo-entregador.component.css'
})
export class AtribuindoEntregadorComponent {
  entregador: any;
  id: number;
  tempoEstimado: string = '';
  erroFormato: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<AtribuindoEntregadorComponent>,
  private pedidoService: PedidoService,
  private router: Router) {
    this.entregador = data.entregador;
    this.id = data.id;
  }

  formatarTempo(): void {
    this.tempoEstimado = this.tempoEstimado.replace(/[^0-9]/g, '').slice(0, 4);
    if (this.tempoEstimado.length >= 3) {
      this.tempoEstimado = `${this.tempoEstimado.slice(0, 2)}:${this.tempoEstimado.slice(2, 4)}`;
    } else if (this.tempoEstimado.length >= 2) {
      this.tempoEstimado = `${this.tempoEstimado.slice(0, 2)}:${this.tempoEstimado.slice(2)}`;
    }
  }

  validarFormato(): boolean {
    const [hh, mm] = this.tempoEstimado.split(':').map(Number);
    return (
      !isNaN(hh) && !isNaN(mm) &&
      hh >= 0 && hh <= 23 &&
      mm >= 0 && mm <= 59
    );
  }

  confirmarAtribuicao(): void {
    if (!this.validarFormato()) {
      this.erroFormato = true;
      return;
    }

    this.erroFormato = false;
    const minutos = parseInt(this.tempoEstimado.split(':')[0]) * 60 + parseInt(this.tempoEstimado.split(':')[1]);

    this.pedidoService.atribuirEntregadorAoPedido(this.id, this.entregador.id, minutos).subscribe({
      next: () => {
          console.log(`Pedido ${this.id} atribuído ao entregador ${this.entregador.nome}`);
          this.dialogRef.close();
          setTimeout(() => {
              this.router.navigate(['/tela-dir-entrega']);
          }, 100);
      },
      error: (err) => {
          console.error('Erro ao atribuir entregador ao pedido:', err);
      }
  });
}
}