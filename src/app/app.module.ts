import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import * as fromHome from './home';
import * as fromItems from './items';
import * as fromVendors from './vendors';

import { PriceCodePipe } from './price-code.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ...fromHome.components,
    ...fromItems.components,
    ...fromVendors.components,
    PriceCodePipe,
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
