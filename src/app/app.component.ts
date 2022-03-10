import { Component, ViewChild, ElementRef } from '@angular/core';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { MarkerDataSeed } from './database/database-seed';
import { PolygonsBoundaries } from './polygons/map-polygons';

import { StylingMarkers } from './markers/styling/marker-style';
import { MarkerEvents } from './markers/events/marker-events';
import { mapStyling } from './map/map-style';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('mapContainer', { static: false }) gmap: ElementRef;
	title = 'Muftijstvo Sandzacko Mape Vakufa';
	
	searchValue?: string;

	gmarkers: Array<any> = [];
	map?: google.maps.Map;
	mapStyle = mapStyling;

	markerData = MarkerDataSeed;
	markerEvents = new MarkerEvents();
	markerStyling = new StylingMarkers();

	polygons = new PolygonsBoundaries();

	mapInitializer(): void {
		this.map = new google.maps.Map(this.gmap.nativeElement, {
			center: new google.maps.LatLng(42.99603931107363, 19.863259815559704),
			zoom: 8.5,
			styles: this.mapStyle,
		});
		this.addMarkerToMap();
		this.polygons.drawPolgygons(this.map);
	}

	ngAfterViewInit(): void {
		this.mapInitializer();
	}

	addMarkerToMap() {
		return this.markerData.map(extractedMarkerData => {
			const marker = new google.maps.Marker({
				...extractedMarkerData,
				position: new google.maps.LatLng(extractedMarkerData.position),
				icon: this.markerStyling.markerIconDefaultCreate(),
				// label: this.markerStyling.markerLabelDefault(extractedMarkerData),
				draggable: false,
				optimized: false,
				animation: google.maps.Animation.DROP,
			});
			this.markerEvents.markerMouseOver(marker);
			this.markerEvents.markerInfoWindow(marker, extractedMarkerData, this.map);
			this.markerEvents.markerMouseOut(marker);
			marker.setMap(this.map);

			this.gmarkers.push(marker);

		});
		// new MarkerClusterer({ this.map, markers });

	}

	onChange(event: any): any {
		if (this.gmarkers)
			return this.gmarkers.filter(markerData => {
				if (markerData.placeName.indexOf(event) != -1 || markerData.setVisible(false)) {
					markerData.setVisible(true)
				}
			});
	}

}