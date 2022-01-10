import { MarkerLabelAndIcons } from '../markers-styling/marker-label-icons';
import { infoWindowStyling } from '../markers-styling/markers-infoWindow-styling';


export class MarkerEvents {

    markerLabelAndIcons = new MarkerLabelAndIcons();
    inforObj = [];
    infoWindowStyling = infoWindowStyling;

    markerInfoWindow(marker, markerInfo, map) {
        let infoWindow = new google.maps.InfoWindow();
        marker.addListener("click", () => {
            this.closeOtherInfo();
            this.markerBounce(marker);

            infoWindow.setContent(this.infoWindowStyling(markerInfo));
            infoWindow.open(map, marker);
            this.inforObj[0] = infoWindow;
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
            this.markerLabelAndIcons.markerMouseOver(marker);
        });
    }

    markerMouseOut(marker) {
        marker.addListener("mouseout", () => {
            this.markerLabelAndIcons.markerMouseOut(marker);
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
        if (this.inforObj.length > 0) {
            // detach the info window from the marker undocumented in google API
            this.inforObj[0].set("marker", null);
            // close it
            this.inforObj[0].close();
            // blank the array
            this.inforObj.length = 0;
        }
    }

}