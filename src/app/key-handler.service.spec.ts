import { TestBed, inject } from '@angular/core/testing';

import { KeyhandlerService } from './keyhandler.service';

describe('KeyhandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyhandlerService]
    });
  });

  it('should be created', inject([KeyhandlerService], (service: KeyhandlerService) => {
    expect(service).toBeTruthy();
  }));
});
