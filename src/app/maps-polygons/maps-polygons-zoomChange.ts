export function zoomChange(map, polygonName) {
    map.addListener("zoom_changed", () => {
        if ( map.getZoom() > 11 ) polygonName.setMap(null);
        else polygonName.setMap(map);
    })
}