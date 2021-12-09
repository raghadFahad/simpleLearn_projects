import { TestBed } from '@angular/core/testing';

import { QuestionCRUDService } from './question-crud.service';

describe('QuestionCRUDService', () => {
  let service: QuestionCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
