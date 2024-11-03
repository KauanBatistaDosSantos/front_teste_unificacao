import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerencia',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './gerencia.component.html',
  styleUrl: './gerencia.component.css'
})
export class GerenciaComponent {
  constructor(private router: Router) {}

  irParaCardapio() {
    this.router.navigate(['/dish-list']);
  }

  irParaPedidos() {
    this.router.navigate(['/tela-dir-entrega']);
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }
}
