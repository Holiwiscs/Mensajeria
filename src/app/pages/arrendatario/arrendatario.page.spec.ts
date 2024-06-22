import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrendatarioPage } from './arrendatario.page';

describe('ArrendatarioPage', () => {
  let component: ArrendatarioPage;
  let fixture: ComponentFixture<ArrendatarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendatarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
