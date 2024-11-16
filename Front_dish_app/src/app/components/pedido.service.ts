import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;
  private cartUrl = `${environment.apiUrl}/cart`;
  private codigoConfirmacao: string = '';
  private pedidoId: string = '';
  private pedidosAtualizados = new Subject<void>();
  private novoPedidoAtribuido = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getNovoPedidoAtribuido(): Observable<void> {
    return this.novoPedidoAtribuido.asObservable();
  }

  getPedidosAtualizados(): Observable<void> {
    return this.pedidosAtualizados.asObservable();
  }

  getSubtotal(): Observable<number> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      map(cartItems => cartItems.reduce((total, item) => total + item.price, 0))
    );
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl);
  }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPedido(pedido: any): Observable<any> {
    const horarioAtual = new Date().toISOString();
    const pedidoComHorario = { ...pedido, horario: horarioAtual };
    return this.http.post<any>(this.apiUrl, pedidoComHorario);
  }

  updatePedido(id: number, pedidoAtualizado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedidoAtualizado);
  }
  
  aceitarPedido(id: number): Observable<any> {
    const horarioAtual = new Date().toISOString();
    
    return this.getPedidoById(id).pipe(
      map(pedido => ({
        ...pedido,
        status: 'em preparo',
        data: horarioAtual
      })),
      switchMap(pedidoAtualizado => this.updatePedido(id, pedidoAtualizado))
    );
  }

  atualizarStatusPedido(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, null, {
      params: { status }
    });
  }
  
  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  atribuirEntregadorAoPedido(id: number, motoboyId: number, tempoEstimado: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/atribuirMotoboy/${motoboyId}?tempoEstimado=${tempoEstimado}`, null).pipe(
      map(() => {
        this.novoPedidoAtribuido.next();
      })
    );
  }

  fazerPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido);
  }

  getPedidoMaisAntigoParaEntregador(entregador: string): Observable<any | null> {
    return this.getPedidos().pipe(
      map(pedidos => 
        pedidos
          .filter(pedido => pedido.entregador === entregador && pedido.status === 'pedido enviado para entrega' || pedido.status === 'aguardando confirmação do entregador')
          .sort((a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime())
      ),
      map(pedidosOrdenados => pedidosOrdenados.length ? pedidosOrdenados[0] : null)
    );
  }

  // finalizarPedido(id: number): Observable<any> {
  //   return this.http.patch(`${this.apiUrl}/${id}`, { status: 'pedido finalizado' }).pipe(
  //     map(() => {
  //       this.pedidosAtualizados.next();
  //     })
  //   );
  // }

  finalizarPedidoCliente(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status: 'aguardando confirmação do entregador' }).pipe(
      map(() => {
        this.pedidosAtualizados.next();
      })
    );
  }
  
  finalizarPedidoEntregador(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status: 'pedido finalizado' }).pipe(
      map(() => {
        this.pedidosAtualizados.next();
      })
    );
  }

  setCodigoConfirmacao(cpf: string, id: string): void {
    this.codigoConfirmacao = cpf.replace(/\D/g, '').slice(0, 5);
    this.pedidoId = id;
  }
  
  getCodigoConfirmacao(): string {
    return this.codigoConfirmacao;
  }

  getPedidoId(): string {
    return this.pedidoId;
  }

  limparCarrinho(): Observable<void> {
    return this.getCartItems().pipe(
        switchMap((items) => 
            forkJoin(items.map(item => this.http.delete<void>(`${this.cartUrl}/${item.id}`)))
        ),
        map(() => undefined)
    );
  }

  getCarrinhoItens(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl);
  }
}
