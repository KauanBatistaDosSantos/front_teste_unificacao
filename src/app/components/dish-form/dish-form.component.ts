import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  
  dish: Dish = { 
    id: "", 
    name: '', 
    description: '', 
    price: 0, 
    image: '', 
    category: '',
    status: 'ativo' 
  };
  isEdit = false;

  constructor( 
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dishService.getDish(id).subscribe(
        (data) => {
          this.dish = data;
        },
        (error) => {
          console.error('Erro ao carregar prato para edição', error);
        }
      );
    } else {
      this.isEdit = false;
    }
  }

  saveDish() {
    if (!this.dish.image || !this.dish.id || !this.dish.description || !this.dish.price || !this.dish.name || !this.dish.category) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.isEdit) {
      this.dishService.updateDish(this.dish.id, this.dish).subscribe(
        () => {
          alert('Prato atualizado com sucesso');
          this.router.navigate(['/dishes']);
        },
        (error) => {
          alert('Erro ao atualizar prato: ' + error.message);
        }
      );
    } else {
      this.dishService.createDish(this.dish).subscribe(
        () => {
          alert('Prato adicionado com sucesso');
          this.router.navigate(['/dish-list']);
        },
        (error) => {
          if (error.message.includes('Dish with ID')) {
            alert('Já existe um prato com esse ID. Tente outro.');
          } else {
            alert('Erro ao adicionar prato: ' + error.message);
          }
        }
      );
    }
  }

  voltar() {
    this.router.navigate(['/dish-list']);
  }
}


