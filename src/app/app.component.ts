
import { Component, ViewChild, ElementRef } from '@angular/core';

import { addMarkerToMap } from './markers-creation/markers-add';
import { mapStyling } from './map-styling/map-style-json';
import { PolygonsBoundaries } from './maps-polygons/map-polygons';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('mapContainer', { static: false }) gmap: ElementRef;
	map?: google.maps.Map;
	markers = addMarkerToMap;
	polygons = new PolygonsBoundaries();

	
	mapInitializer(): void {
		this.map = new google.maps.Map(this.gmap.nativeElement,{
			center: new google.maps.LatLng(43.0806892, 19.5989368),
			zoom: 9,
			styles: mapStyling
			
		});
		this.markers(this.map);
		this.polygons.drawPolgygons(this.map);
	}

	ngAfterViewInit(): void {
		this.mapInitializer();
		
	}

}
