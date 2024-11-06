import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntregadorService {
  private apiUrl = `${environment.apiUrl}/entregadores`;

  constructor(private http: HttpClient) {}

  getEntregadoresDisponiveis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(entregadores => entregadores.filter(entregador => entregador.status === 'disponível'))
      );
  }
}
