import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Entregador {
  id?: number;
  nome: string;
  cpf: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})

export class EntregadorService {
  private apiUrl = `${environment.apiUrl}/motoboy`;

  constructor(private http: HttpClient) {}

  getEntregadoresDisponiveis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(entregadores => entregadores.filter(entregador => entregador.status === 'disponível'))
      );
  }

  createEntregador(entregador: Entregador): Observable<Entregador> {
    return this.http.post<Entregador>(this.apiUrl, entregador);
  }

  getEntregadores(): Observable<Entregador[]> {
    return this.http.get<Entregador[]>(this.apiUrl);
  }

  updateEntregador(entregador: Entregador): Observable<Entregador> {
    return this.http.put<Entregador>(`${this.apiUrl}/${entregador.id}`, entregador);
  }

  deleteEntregador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  finalizarEntrega(cpfInicio: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/finalizarEntrega`, null, {
      params: { cpfInicio }
    });
  }
}
