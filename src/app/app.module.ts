import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DatabaseScaffoldComponent } from './database-scaffold/database-scaffold.component';
import { DatabaseSeedingComponent } from './database-seeding/database-seeding.component';
import { MarkersCreationComponent } from './markers-creation/markers-creation.component';
import { MapsPolygonsComponent } from './maps-polygons/maps-polygons.component';
import { MapStylingComponent } from './map-styling/map-styling.component';

@NgModule({
  declarations: [
    AppComponent,
    DatabaseScaffoldComponent,
    DatabaseSeedingComponent,
    MarkersCreationComponent,
    MapsPolygonsComponent,
    MapStylingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
