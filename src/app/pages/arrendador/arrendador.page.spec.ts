import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrendadorPage } from './arrendador.page';

describe('ArrendadorPage', () => {
  let component: ArrendadorPage;
  let fixture: ComponentFixture<ArrendadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
