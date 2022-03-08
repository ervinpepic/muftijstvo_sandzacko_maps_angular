import { Component, ViewChild, ElementRef } from '@angular/core';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { MarkerDataSeed } from './database/database-seed';

import { PolygonsBoundaries } from './polygons/map-polygons';

import { MarkerLabelAndIcons } from './markers/markers-styling/marker-label-icons';
import { MarkerEvents } from './markers/markers-events/marker-events-main';
import { mapStyling } from './map/mapStyle';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('mapContainer', { static: false }) gmap: ElementRef;
	
	title = 'Muftijstvo Sandzacko Mape Vakufa';

	map?: google.maps.Map;
	mapStyle = mapStyling;

	markerData = MarkerDataSeed;
	gmarkers: any = [];

	markerEvents = new MarkerEvents();
	markerLabelAndIcons = new MarkerLabelAndIcons();
	polygons = new PolygonsBoundaries();

	ngAfterViewInit(): void {
		this.mapInitializer();
	}

	mapInitializer(): void {
		this.map = new google.maps.Map(this.gmap.nativeElement, {
			center: new google.maps.LatLng(42.99603931107363, 19.863259815559704),
			zoom: 8.5,
			styles: this.mapStyle,
		});
		this.addMarkerToMap(this.map);
		this.polygons.drawPolgygons(this.map);
	}

	addMarkerToMap(map) {
		const markers = this.markerData.map(marker_data => {
			let marker = new google.maps.Marker({
				...marker_data,
				position: new google.maps.LatLng(marker_data.position),
				icon: this.markerLabelAndIcons.markerIconDefaultCreate(),
				label: this.markerLabelAndIcons.markerLabelDefault(marker_data),
				draggable: false,
				optimized: false,
				animation: google.maps.Animation.DROP,
			});

			this.markerEvents.markerInfoWindow(marker, marker_data, map);
			this.markerEvents.markerMouseOver(marker);
			this.markerEvents.markerMouseOut(marker);

			return marker;
		});

		new MarkerClusterer({ map, markers });

	}

}
