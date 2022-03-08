export class MarkerLabelAndIcons {
    
    markerIconDefaultCreate() {
        let icon = {
            url: "../assets/images/marker_main.svg",
            scaledSize: new google.maps.Size(40, 40),
            labelOrigin: new google.maps.Point(20, -15),
        }
        return icon
    }
    markerIconDefault(marker) {
        marker.setIcon({
            url: "../assets/images/marker_main.svg",
            scaledSize: new google.maps.Size(40, 40),
            labelOrigin: new google.maps.Point(20, -15),
        });
    }

    markerIconLarge(marker) {
        marker.setIcon({
            url: "../assets/images/marker_hover.svg",
            scaledSize: new google.maps.Size(60, 60),
            labelOrigin: new google.maps.Point(40, -25),
        });
    }

    // markerIconClicked(marker) {
    //     marker.setIcon({
    //         url: "../assets/images/marker_click.svg",
    //         scaledSize: new google.maps.Size(60, 60),
    //         labelOrigin: new google.maps.Point(40, -25),
    //     });
    // }
    markerLabelDefault(marker_data) {
        let markerLabel = {
            text: marker_data.placeName,
            className: "label",
        }
        return markerLabel;
    }
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    markerMouseOver(marker) {
       this.markerIconLarge(marker);
        let label = marker.getLabel();
        label.className = "marker-label-mouseover"
    };

    markerMouseOut(marker) {
        this.markerIconDefault(marker);
        let label = marker.getLabel();
        label.className = "label";
    }

    markerMouseClick(marker) {
        let label = marker.getLabel();
        label.className = "label";
    }

}

