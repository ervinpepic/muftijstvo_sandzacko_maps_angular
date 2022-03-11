import { Component, ViewChild, ElementRef } from '@angular/core';

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

	searchWord?: string = '';
	allMarkers: Array<any> = [];

	map?: google.maps.Map;
	mapStyle = mapStyling;
	mapCenter = new google.maps.LatLng(42.99603931107363, 19.863259815559704);

	markerData = MarkerDataSeed;
	markerEvents = new MarkerEvents();
	markerStyling = new StylingMarkers();

	polygons = new PolygonsBoundaries();

	mapInitializer(): void {
		this.map = new google.maps.Map(this.gmap.nativeElement, {
			center: this.mapCenter,
			zoom: 9,
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
				label: '',
				draggable: false,
				optimized: false,
				animation: google.maps.Animation.DROP,
			});
			marker.setMap(this.map);
			this.allMarkers.push(marker);

			this.markerEvents.markerInfoWindow(marker, extractedMarkerData, this.map);

			this.markerEvents.markerMouseOver(marker);
			this.markerEvents.markerMouseOut(marker);

			// return marker

		});
		// new MarkerClusterer({ map, markers });

	}

	onChange(event: any): any {
		if (this.searchWord == '' && event == '') {
			this.map.setCenter(this.mapCenter)
			this.map.setZoom(9);
		}
		if (this.allMarkers && this.searchWord)
			return this.allMarkers.filter(marker => {
				if (marker.placeName.toLowerCase().indexOf(event.toLowerCase()) != -1) {
					marker.setVisible(true)
					this.map.setZoom(9.2)
				}
				else {
					marker.setVisible(false)
					return this.allMarkers;
				}
			});
	}

}