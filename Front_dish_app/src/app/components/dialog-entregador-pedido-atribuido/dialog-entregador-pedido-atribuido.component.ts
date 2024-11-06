import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-entregador-pedido-atribuido',
  standalone: true,
  imports: [],
  templateUrl: './dialog-entregador-pedido-atribuido.component.html',
  styleUrl: './dialog-entregador-pedido-atribuido.component.css'
})
export class DialogEntregadorPedidoAtribuidoComponent {
  constructor(public dialogRef: MatDialogRef<DialogEntregadorPedidoAtribuidoComponent>) {}

  iniciar(): void {
    this.dialogRef.close('iniciar');
  }
}