import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarEmailComponent } from './atualizar-email.component';

describe('AtualizarEmailComponent', () => {
  let component: AtualizarEmailComponent;
  let fixture: ComponentFixture<AtualizarEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarEmailComponent]
    });
    fixture = TestBed.createComponent(AtualizarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
