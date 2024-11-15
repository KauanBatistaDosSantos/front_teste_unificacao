import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntregadoresComponent } from './lista-entregadores.component';

describe('ListaEntregadoresComponent', () => {
  let component: ListaEntregadoresComponent;
  let fixture: ComponentFixture<ListaEntregadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEntregadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEntregadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
