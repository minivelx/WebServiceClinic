import { TestBed } from '@angular/core/testing';

import { GlobalUrlsService } from './global-urls.service';

describe('GlobalUrlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalUrlsService = TestBed.get(GlobalUrlsService);
    expect(service).toBeTruthy();
  });
});
