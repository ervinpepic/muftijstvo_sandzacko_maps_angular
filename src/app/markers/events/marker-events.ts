import { StylingMarkers } from '../styling/marker-style';
import { infoWindowStyling } from '../../info-window/info-window-style';


export class MarkerEvents {
    infoWindowClosing = [];
    infoWindowStyling = infoWindowStyling;

    markerStyling = new StylingMarkers();

    markerInfoWindow(marker, markerData, map) {
        let infoWindow = new google.maps.InfoWindow();
        marker.addListener("click", () => {
            this.closeOtherInfo();
            this.markerBounce(marker);

            infoWindow.setContent(this.infoWindowStyling(markerData));
            infoWindow.open(map, marker);
            this.infoWindowClosing[0] = infoWindow;
            map.panTo(marker.getPosition());
            
        });
        
        infoWindow.addListener("closeclick", () => {
            map.panTo(marker.getPosition());
            map.setZoom(map.getZoom() - 0.5);
        });

        map.addListener("click", () => {
            infoWindow.close();
            marker.open = false;
            map.setZoom(map.getZoom() - 0.9 / 1.8);
        });
        
    }

    markerMouseOver(marker) {
        marker.addListener("mouseover", () => {
            this.markerStyling.markerMouseOver(marker);
        });
    }

    markerMouseOut(marker) {
        marker.addListener("mouseout", () => {
            this.markerStyling.markerMouseOut(marker);
        });
    }

    markerBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 2000); // current maps duration of one bounce (v3.13)
        }
    }

    closeOtherInfo() {
        if (this.infoWindowClosing.length > 0) {
            // detach the info window from the marker undocumented in google API
            this.infoWindowClosing[0].set("marker", null);
            // close it
            this.infoWindowClosing[0].close();
            // blank the array
            this.infoWindowClosing.length = 0;
        }
    }

}