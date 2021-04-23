import MarkerClusterer from '@googlemaps/markerclustererplus';

import { MarkerDataSeed } from '../database-seeding/database-markers-data-seed';

import { MarkerEvents } from './markers-events/marker-events-main';
import { MarkerLabelAndIcons } from './markers-styling/marker-label-icons';


export function addMarkerToMap(map) {

    let markerDataSeed = MarkerDataSeed;
    let markerEvents = new MarkerEvents();
    let markerLabelAndIcons = new MarkerLabelAndIcons();
    

    const markers = markerDataSeed.map(marker_data => {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(marker_data.latLng.lat, marker_data.latLng.lng),
            icon: markerLabelAndIcons.markerIconDefaultCreate(),
            label: markerLabelAndIcons.markerLabelDefault(marker_data),
            draggable: true,
            animation: google.maps.Animation.DROP,
        });
        
        markerEvents.markerInfoWindow(marker, marker_data, map);
        markerEvents.markerMouseOver(marker);
        markerEvents.markerMouseOut(marker);

        return marker;
    });

    new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });


}