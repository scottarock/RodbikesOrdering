import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

import { OrderNewComponent } from './orders';

@Injectable({
  providedIn: 'root'
})
export class CanLeaveOrderGuard implements CanDeactivate<OrderNewComponent> {

  constructor() { }

  canDeactivate( component: OrderNewComponent ): Observable<boolean> | boolean {

    return component.canNavigate();

  }

}
