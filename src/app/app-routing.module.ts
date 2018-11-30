import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromHome from './home';
import * as fromItems from './items';

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
        path: 'new',
        pathMatch: 'full',
        component: fromItems.ItemNewComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
