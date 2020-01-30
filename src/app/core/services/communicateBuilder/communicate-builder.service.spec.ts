import { TestBed } from '@angular/core/testing';

import { CommunicateBuilderService } from './communicate-builder.service';

describe('CommunicateBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicateBuilderService = TestBed.get(CommunicateBuilderService);
    expect(service).toBeTruthy();
  });
});
