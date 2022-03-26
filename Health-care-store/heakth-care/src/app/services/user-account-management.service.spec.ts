import { TestBed } from '@angular/core/testing';

import { UserAccountManagementService } from './user-account-management.service';

describe('UserAccountManagementService', () => {
  let service: UserAccountManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
