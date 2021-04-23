export function infoWindowStyling(markerInfo) {
    return (
        "<div class='infowindow'>" +
        "<h3 class='h3'>" +
        markerInfo.placeName +
        "</h3>" +
        "<p class='lead'>" +
        markerInfo.specInfo +
        "</p>" +
        markerInfo.img +
        "</div>"
    );
}
