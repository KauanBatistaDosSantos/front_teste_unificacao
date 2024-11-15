import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EntregadorService, Entregador } from '../entregador.service';

@Component({
  selector: 'app-entregador-modelo',
  standalone: true,
  imports: [],
  templateUrl: './entregador-modelo.component.html',
  styleUrl: './entregador-modelo.component.css'
})
export class EntregadorModeloComponent {
  @Input() entregador!: Entregador;
  @Output() statusAlterado = new EventEmitter<void>();
  @Output() excluido = new EventEmitter<void>();

  erro: string = '';

  constructor(private entregadorService: EntregadorService) {}

  editarEntregador(): void {
    if (this.entregador.id !== undefined) {
      this.entregador.status = this.entregador.status === 1 ? 0 : 1;
      this.entregadorService.updateEntregador(this.entregador).subscribe(
        () => this.statusAlterado.emit(),
        (error) => this.erro = 'Erro ao editar entregador'
      );
    } else {
      this.erro = 'ID do entregador não está definido';
    }
  }

  excluirEntregador(): void {
    if (this.entregador.id !== undefined) {
      this.entregadorService.deleteEntregador(this.entregador.id).subscribe(
        () => this.excluido.emit(),
        (error) => this.erro = 'Erro ao excluir entregador'
      );
    } else {
      this.erro = 'ID do entregador não está definido';
    }
  }
}