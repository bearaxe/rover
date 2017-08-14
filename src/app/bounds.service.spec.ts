import { TestBed, inject } from '@angular/core/testing';

import { BoundsService } from './bounds.service';

describe('BoundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoundsService]
    });
  });

  it('should be created', inject([BoundsService], (service: BoundsService) => {
    expect(service).toBeTruthy();
  }));
});
