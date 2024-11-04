import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos';
  private cartUrl = 'http://localhost:3000/cart';
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
        horario: horarioAtual
      })),
      switchMap(pedidoAtualizado => this.updatePedido(id, pedidoAtualizado))
    );
  }
  
  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  atribuirEntregadorAoPedido(id: number, entregadorNome: string, tempoEstimado: number): Observable<any> {
    const pedidoAtualizado = {
      entregador: entregadorNome,
      status: 'pedido enviado para entrega',
      tempoEstimado: tempoEstimado
    };
    return this.http.patch(`${this.apiUrl}/${id}`, pedidoAtualizado).pipe(
      map(() => {
        this.novoPedidoAtribuido.next();
      })
    );
  }

  fazerPedido(pedido: any): Observable<any> {
    return this.getPedidos().pipe(
      map((pedidos) => {
        const ultimoPedido = pedidos.length ? pedidos[pedidos.length - 1] : null;
        const novoId = ultimoPedido ? +ultimoPedido.id + 1 : 1;
        const numeroPedido = ultimoPedido ? ultimoPedido.numeroPedido + 1 : 1;
        const horarioAtual = new Date().toISOString();

        return {
          ...pedido,
          id: String(novoId),
          numeroPedido: numeroPedido,
          horario: horarioAtual,
          status: 'não aceito',
          tempo: '',
          entregador: ''
        };
      }),
      switchMap((novoPedido) => this.http.post<any>(this.apiUrl, novoPedido))
    );
  }

  getPedidoMaisAntigoParaEntregador(entregador: string): Observable<any | null> {
    return this.getPedidos().pipe(
      map(pedidos => 
        pedidos
          .filter(pedido => pedido.entregador === entregador && pedido.status === 'pedido enviado para entrega')
          .sort((a, b) => new Date(a.horario).getTime() - new Date(b.horario).getTime())
      ),
      map(pedidosOrdenados => pedidosOrdenados.length ? pedidosOrdenados[0] : null)
    );
  }

  finalizarPedido(id: number): Observable<any> {
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
