import {TestBed, inject} from '@angular/core/testing';

import {DataTableService} from './data-table.service';

describe('DataTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTableService]
    });
  });

  it('should be created', inject([DataTableService], (service: DataTableService) => {
    expect(service).toBeTruthy();
  }));
});
