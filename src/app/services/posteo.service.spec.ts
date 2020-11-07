import { TestBed } from '@angular/core/testing';

import { PosteoService } from './posteo.service';

describe('PosteoService', () => {
  let service: PosteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
