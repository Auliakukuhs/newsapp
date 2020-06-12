import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NewsApiService} from './services/news-api.service';
import {RouterModule, Routes} from '@angular/router';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: "", component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
