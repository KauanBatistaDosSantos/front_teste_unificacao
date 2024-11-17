import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntregadorService, Entregador } from '../../services/entregador.service';
import { EntregadorModeloComponent } from '../entregador-modelo/entregador-modelo.component';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-lista-entregadores',
  standalone: true,
  imports: [EntregadorModeloComponent, MatIcon, NgIf, NgForOf],
  templateUrl: './lista-entregadores.component.html',
  styleUrl: './lista-entregadores.component.css'
})
export class ListaEntregadoresComponent implements OnInit {
  entregadores: Entregador[] = [];
  erro: string = '';

  constructor(
    private router: Router,
    private entregadorService: EntregadorService
  ) {}

  ngOnInit(): void {
    this.carregarEntregadores();
  }

  voltar() {
    this.router.navigate(['/gerencia']);
  }

  cadastrar() {
    this.router.navigate(['/cadastro-entregadores']);
  }

  carregarEntregadores(): void {
    this.entregadorService.getEntregadores().subscribe(
      (data) => this.entregadores = data,
      (error) => this.erro = 'Erro ao carregar entregadores'
    );
  }
}