import { TestBed, async, inject } from '@angular/core/testing';

import { CanLeaveOrderGuard } from './can-leave-order.guard';

describe('CanLeaveOrderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanLeaveOrderGuard]
    });
  });

  it('should ...', inject([CanLeaveOrderGuard], (guard: CanLeaveOrderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
