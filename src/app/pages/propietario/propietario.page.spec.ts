import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropietarioPage } from './propietario.page';

describe('PropietarioPage', () => {
  let component: PropietarioPage;
  let fixture: ComponentFixture<PropietarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
