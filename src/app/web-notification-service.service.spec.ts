import { TestBed } from '@angular/core/testing';

import { WebNotificationServiceService } from './web-notification-service.service';

describe('WebNotificationServiceService', () => {
  let service: WebNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
