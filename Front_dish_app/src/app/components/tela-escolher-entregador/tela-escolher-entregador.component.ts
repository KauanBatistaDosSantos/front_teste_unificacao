import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { EntregadorService } from '../entregador.service';
import { EntregadoresComponent } from '../entregadores/entregadores.component';

@Component({
  selector: 'app-tela-escolher-entregador',
  standalone: true,
  imports: [EntregadoresComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterLink,
    NgFor
  ],
  templateUrl: './tela-escolher-entregador.component.html',
  styleUrl: './tela-escolher-entregador.component.css'
})
export class TelaEscolherEntregadorComponent implements OnInit {
  entregadores: any[] = [];
  id: number | null = null;

  constructor(private entregadorService: EntregadorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntregadoresDisponiveis();
  }

  loadEntregadoresDisponiveis(): void {
    this.entregadorService.getEntregadoresDisponiveis().subscribe((data) => {
      this.entregadores = data;
    });
  }
}