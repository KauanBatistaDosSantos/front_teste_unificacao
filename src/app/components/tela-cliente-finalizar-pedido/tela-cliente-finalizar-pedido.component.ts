import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InserirCpfComponent } from '../inserir-cpf/inserir-cpf.component';
import { InserirEnderecoComponent } from '../inserir-endereco/inserir-endereco.component';
import { PedidoService } from '../pedido.service';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InserirNomeComponent } from '../inserir-nome/inserir-nome.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tela-cliente-finalizar-pedido',
  standalone: true,
  imports: [MatIcon, NgClass, CommonModule, FormsModule],
  templateUrl: './tela-cliente-finalizar-pedido.component.html',
  styleUrl: './tela-cliente-finalizar-pedido.component.css'
})
export class TelaClienteFinalizarPedidoComponent implements OnInit {
  enderecoSalvo: any = null;
  cpfSalvo: string = '';
  nomeSalvo: string = '';
  isButtonEnabled: boolean = false;
  subtotal: number = 0;
  taxaEntrega: number = 15;
  total: number = 0;
  observacao: string = '';
  cartItems: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoService.getSubtotal().subscribe(subtotal => {
      this.subtotal = subtotal;
      this.calcularTotal();
    });
  
    this.pedidoService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calcularTotal();
    });
  }

  abrirDialogoInserirNome(): void {
    const dialogRef = this.dialog.open(InserirNomeComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nomeSalvo = result;
        this.verificarCampos();
      }
    });
  }

  abrirDialogCpf(): void {
    const dialogRef = this.dialog.open(InserirCpfComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cpfSalvo = result;
        this.verificarCampos();
      }
    });
  }

  abrirDialogoInserirEndereco(): void {
    const dialogRef = this.dialog.open(InserirEnderecoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enderecoSalvo = result;
        this.verificarCampos();
      }
    });
  }

  verificarCampos(): void {
    if (this.cpfSalvo && this.enderecoSalvo && this.nomeSalvo) {
      this.isButtonEnabled = true;
    } else {
      this.isButtonEnabled = false;
    }
  }

  calcularTotal(): void {
    this.total = this.subtotal + this.taxaEntrega;
  }

  navegarParaOutroComponente() {
    if (this.isButtonEnabled) {
      const novoPedido = {
        nomeCliente: this.nomeSalvo,
        itens: this.cartItems,
        preco: this.total,
        endereco: `${this.enderecoSalvo.logradouro}, ${this.enderecoSalvo.numero} - ${this.enderecoSalvo.bairro}`,
        cpf: this.cpfSalvo,
        observacao: this.observacao
      };
  
      this.pedidoService.fazerPedido(novoPedido).pipe(
        switchMap((pedidoCriado) => this.pedidoService.limparCarrinho().pipe(
          switchMap(() => {
            this.pedidoService.setCodigoConfirmacao(this.cpfSalvo, pedidoCriado.id);
            return this.router.navigate(['/acompanhar-pedido']);
          })
        ))
      ).subscribe();
    }
  }

  ajustarAltura(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  voltar() {
    this.router.navigate(['/carrinho']);
  }
}