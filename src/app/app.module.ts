import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniqueNamesPipe } from './unique-names-pipe.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { HighlightSearchTermPipe } from './highlight-search-term.pipe';

@NgModule({
  declarations: [AppComponent, UniqueNamesPipe, EllipsisPipe, HighlightSearchTermPipe],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
