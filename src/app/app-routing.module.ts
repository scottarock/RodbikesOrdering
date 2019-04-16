import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromHome from './home';
import * as fromItems from './items';
import * as fromVendors from './vendors';
import * as fromOrders from './orders';

import { CanLeaveOrderGuard } from './can-leave-order.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: fromHome.LandingComponent,
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: fromItems.ItemListComponent,
      },
      {
        path: 'find',
        pathMatch: 'full',
        component: fromItems.ItemSearchComponent,
      },
    ],
  },
  {
    path: 'vendors',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: fromVendors.VendorListComponent,
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: fromVendors.VendorNewComponent,
      },
    ],
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: fromOrders.OrderListComponent,
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: fromOrders.OrderNewComponent,
        canDeactivate: [CanLeaveOrderGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
