import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import * as fromHome from './home';
import * as fromItems from './items';
import { ItemHybridComponent } from './items/item-hybrid/item-hybrid.component';

@NgModule({
  declarations: [
    AppComponent,
    ...fromItems.components,
    ...fromHome.components,
    ItemHybridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
