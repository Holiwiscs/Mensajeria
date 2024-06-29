import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RommiePage } from './rommie.page';

describe('RommiePage', () => {
  let component: RommiePage;
  let fixture: ComponentFixture<RommiePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RommiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
