import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregadorModeloComponent } from './entregador-modelo.component';

describe('EntregadorModeloComponent', () => {
  let component: EntregadorModeloComponent;
  let fixture: ComponentFixture<EntregadorModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntregadorModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntregadorModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
