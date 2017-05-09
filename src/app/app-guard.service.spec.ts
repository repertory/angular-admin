import { TestBed, inject } from '@angular/core/testing';

import { AppGuardService } from './app-guard.service';

describe('AppGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuardService]
    });
  });

  it('should ...', inject([AppGuardService], (service: AppGuardService) => {
    expect(service).toBeTruthy();
  }));
});
