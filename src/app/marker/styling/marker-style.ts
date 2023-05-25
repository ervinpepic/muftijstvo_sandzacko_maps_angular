export class StylingMarkers {
  markerIconDefaultCreate() {
    let icon = {
      url: '../assets/images/marker_main.svg',
      scaledSize: new google.maps.Size(40, 40),
      labelOrigin: new google.maps.Point(20, -15),
    };
    return icon;
  }
  markerIconDefault(marker: google.maps.Marker) {
    marker.setIcon({
      url: '../assets/images/marker_main.svg',
      scaledSize: new google.maps.Size(40, 40),
      labelOrigin: new google.maps.Point(20, -15),
    });
  }

  markerIconLarge(marker: google.maps.Marker) {
    marker.setIcon({
      url: '../assets/images/marker_hover.svg',
      scaledSize: new google.maps.Size(60, 60),
      labelOrigin: new google.maps.Point(40, -25),
    });
  }
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  markerMouseOver(marker: google.maps.Marker) {
    this.markerIconLarge(marker);
  }

  markerMouseOut(marker: google.maps.Marker) {
    this.markerIconDefault(marker);
  }
}
