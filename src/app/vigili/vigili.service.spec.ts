import { TestBed, inject } from '@angular/core/testing';

import { VigiliService } from './vigili.service';

describe('VigiliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VigiliService]
    });
  });

  it('should be created', inject([VigiliService], (service: VigiliService) => {
    expect(service).toBeTruthy();
  }));
});
