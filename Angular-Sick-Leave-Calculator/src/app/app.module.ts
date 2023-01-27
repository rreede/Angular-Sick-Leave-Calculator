import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompensationCalculatorComponent } from './compensation-calculator/compensation-calculator.component';



@NgModule({
  declarations: [
    AppComponent,
    CompensationCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
