import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar-component/navbar.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { HighlightSearchTermPipe } from './pipes/highlight-search-term.pipe';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AppComponent, EllipsisPipe, HighlightSearchTermPipe, NavbarComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgSelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
