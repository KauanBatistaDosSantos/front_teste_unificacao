import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  criarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  atualizarCliente(id: number, clienteAtualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, clienteAtualizado);
  }

  buscarClientePorCpf(cpf: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?cpf=${cpf}`);
  }

  buscarOuCriarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/buscarOuCriar`, cliente);
  }

  salvarDadosLocais(cliente: any): void {
    localStorage.setItem('nomeCliente', cliente.nome);
    localStorage.setItem('cpfCliente', cliente.cpf);
    localStorage.setItem('enderecoCliente', JSON.stringify(cliente.endereco));
  }

  carregarDadosLocais(): any {
    if (typeof window !== 'undefined' && localStorage) {
        return {
            nome: localStorage.getItem('nomeCliente') || '',
            cpf: localStorage.getItem('cpfCliente') || '',
            endereco: JSON.parse(localStorage.getItem('enderecoCliente') || 'null'),
        };
    } else {
        return {
            nome: '',
            cpf: '',
            endereco: null,
        };
    }
  }
}