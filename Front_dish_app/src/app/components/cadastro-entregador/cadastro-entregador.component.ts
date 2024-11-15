import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregadorService, Entregador } from '../entregador.service';

@Component({
  selector: 'app-cadastro-entregador',
  standalone: true,
  imports: [MatIcon, NgIf, FormsModule],
  templateUrl: './cadastro-entregador.component.html',
  styleUrl: './cadastro-entregador.component.css'
})
export class CadastroEntregadorComponent {
  nome: string = '';
  cpf: string = '';
  disponibilidade: number = 1;
  erro: string = '';

  constructor(private entregadorService: EntregadorService, private router: Router) {}

  voltar() {
    this.router.navigate(['/lista-entregadores']);
  }

  formatarCpf() {
    this.cpf = this.cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  definirDisponibilidade(status: number) {
    this.disponibilidade = status;
  }

  validarCpf(cpf: string): boolean {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
  }

  cadastrarEntregador(): void {
    const novoEntregador: Entregador = {
      nome: this.nome,
      cpf: this.cpf,
      status: this.disponibilidade
    };

    this.entregadorService.createEntregador(novoEntregador).subscribe(
      () => {
        this.router.navigate(['/lista-entregadores']);
      },
      (error) => {
        this.erro = 'Erro ao cadastrar entregador';
        console.error(error);
      }
    );
  }
}