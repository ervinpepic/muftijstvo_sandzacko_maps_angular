import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniqueNamesPipePipe } from './unique-names-pipe.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UniqueNamesPipePipe,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
