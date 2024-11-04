import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoStatusService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {
  }

  private statusSubject = new BehaviorSubject<string>('Pedido sendo preparado');
  
  status$: Observable<string> = this.statusSubject.asObservable();

  atualizarStatus(novoStatus: string) {
    this.statusSubject.next(novoStatus);
  }

  obterStatusPedido(id: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(pedido => pedido.status)
    );
  }
}
