import { Injectable } from '@angular/core';
import { CustomMarker } from './marker/Marker';
import { VakufData } from './database/database-seed';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  getMarkers(): Observable<CustomMarker[]> {
    const vakufData = of (VakufData);
    return vakufData
  }
}
