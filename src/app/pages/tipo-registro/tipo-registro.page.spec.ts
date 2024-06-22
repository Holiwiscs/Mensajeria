import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoRegistroPage } from './tipo-registro.page';

describe('TipoRegistroPage', () => {
  let component: TipoRegistroPage;
  let fixture: ComponentFixture<TipoRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
