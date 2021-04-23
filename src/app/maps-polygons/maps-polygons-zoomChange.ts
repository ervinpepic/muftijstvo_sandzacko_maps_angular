export function zoomChange(map, polygonName) {
    map.addListener("zoom_changed", () => {
        if ( map.getZoom() > 13 ) polygonName.setMap(null);
        else polygonName.setMap(map);
    })
}