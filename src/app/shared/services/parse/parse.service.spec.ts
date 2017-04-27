import { TestBed, inject } from '@angular/core/testing';

import { ParseService } from './parse.service';

describe('ParseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseService]
    });
  });

  it('should ...', inject([ParseService], (service: ParseService) => {
    expect(service).toBeTruthy();
  }));
});
