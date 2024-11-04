import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoStatusService {
  private statusSubject = new BehaviorSubject<string>('Pedido sendo preparado');
  status$: Observable<string> = this.statusSubject.asObservable();

  // Chave para armazenar e recuperar o número de confirmação no localStorage
  private confirmacaoKey = 'codigoConfirmacao';

  // Função para atualizar o status
  atualizarStatus(novoStatus: string): void {
    this.statusSubject.next(novoStatus);
  }

  // Função para salvar o número de confirmação no localStorage
  salvarConfirmacao(codigoConfirmacao: string): void {
    localStorage.setItem(this.confirmacaoKey, codigoConfirmacao);
  }

  // Função para obter o número de confirmação do localStorage
  obterConfirmacao(): string | null {
    return localStorage.getItem(this.confirmacaoKey);
  }

  // Função para limpar o número de confirmação do localStorage
  limparConfirmacao(): void {
    localStorage.removeItem(this.confirmacaoKey);
  }
}
