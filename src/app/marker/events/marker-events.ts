import { StylingMarkers } from '../styling/marker-style';
import { infoWindowStyling } from '../info-window/info-window-style';
import { CustomMarker } from '../Marker';

export class MarkerEvents {
  infoWindowsClose: any = [];
  infoWindowStyling = infoWindowStyling;

  markerStyling = new StylingMarkers();

  markerInfoWindow(marker: any, markerData: CustomMarker, map: any) {
    let infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', () => {
      this.closeOtherInfo();
      this.markerBounce(marker);

      infoWindow.setContent(this.infoWindowStyling(markerData));
      infoWindow.open(map, marker);
      this.infoWindowsClose[0] = infoWindow;
      map.panTo(marker.getPosition());
    });

    infoWindow.addListener('closeclick', () => {
      map.panTo(marker.getPosition());
      map.setZoom(map.getZoom() - 0.5);
    });

    map.addListener('click', () => {
      infoWindow.close();
      marker.open = false;
      map.setZoom(map.getZoom() - 0.9 / 1.8);
    });
  }

  markerMouseOver(marker: any) {
    marker.addListener('mouseover', () => {
      this.markerStyling.markerMouseOver(marker);
    });
  }

  markerMouseOut(marker: any) {
    marker.addListener('mouseout', () => {
      this.markerStyling.markerMouseOut(marker);
    });
  }

  markerBounce(marker: any) {
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
    if (this.infoWindowsClose.length > 0) {
      // detach the info window from the marker undocumented in google API
      this.infoWindowsClose[0].set('marker', null);
      // close it
      this.infoWindowsClose[0].close();
      // blank the array
      this.infoWindowsClose.length = 0;
    }
  }
}
