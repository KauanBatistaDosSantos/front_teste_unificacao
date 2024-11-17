import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregadorService, Entregador } from '../../services/entregador.service';

@Component({
  selector: 'app-cadastro-entregador',
  standalone: true,
  imports: [MatIcon, NgIf, FormsModule],
  templateUrl: './cadastro-entregador.component.html',
  styleUrl: './cadastro-entregador.component.css'
})
export class CadastroEntregadorComponent implements OnInit {
  nome: string = '';
  cpf: string = '';
  disponibilidade: number = 1;
  erro: string = '';
  isEditMode: boolean = false;
  entregadorId?: number;

  constructor(
    private entregadorService: EntregadorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.entregadorId = +id;
        this.carregarEntregador();
      }
    });
  }
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

    if (this.isEditMode && this.entregadorId) {
      novoEntregador.id = this.entregadorId;
      this.entregadorService.updateEntregador(novoEntregador).subscribe(
        () => {
          this.router.navigate(['/lista-entregadores']);
        },
        (error) => {
          this.erro = 'Erro ao atualizar entregador';
          console.error(error);
        }
      );
    } else {
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

  carregarEntregador(): void {
    if (this.entregadorId) {
      this.entregadorService.getEntregadorById(this.entregadorId).subscribe(
        (entregador) => {
          this.nome = entregador.nome;
          this.cpf = entregador.cpf;
          this.disponibilidade = entregador.status;
        },
        (error) => {
          this.erro = 'Erro ao carregar dados do entregador';
          console.error(error);
        }
      );
    }
  }
}