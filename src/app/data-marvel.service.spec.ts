import { TestBed } from '@angular/core/testing';

import { DataMarvelService } from './data-marvel.service';

describe('DataMarvelService', () => {
  let service: DataMarvelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMarvelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
