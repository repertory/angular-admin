import { TestBed, inject } from '@angular/core/testing';

import { AdminMenuService } from './admin-menu.service';

describe('AdminMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminMenuService]
    });
  });

  it('should be created', inject([AdminMenuService], (service: AdminMenuService) => {
    expect(service).toBeTruthy();
  }));
});
