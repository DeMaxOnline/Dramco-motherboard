import { TestBed } from '@angular/core/testing';

import { InternetConnectionService } from './internet-connection.service';

describe('InternetConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternetConnectionService = TestBed.get(InternetConnectionService);
    expect(service).toBeTruthy();
  });
});
