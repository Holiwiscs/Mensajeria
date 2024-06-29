import { TestBed } from '@angular/core/testing';

import { FotografiaService } from './fotografia.service';

describe('FotografiaService', () => {
  let service: FotografiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotografiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
