import { petnjicaPolygonDelimiter } from './sandzak/petnjica';
import { andrijevicaPolygonDelimiter } from './sandzak/andrijevica';
import { bijeloPoljePolygonDelimiter } from './sandzak/bijeloPolje';
import { beranePolygonDelimiter } from './sandzak/berane';
import { gusinjePolygonDelimiter } from './sandzak/gusinje';
import { noviPazarPolygonDelimiter } from './sandzak/noviPazar';
import { novaVarosPolygonDelimiter } from './sandzak/novaVaros';
import { pribojPolygonDelimiter } from './sandzak/priboj';
import { prijepoljePolygonDelimiter } from './sandzak/prijepolje';
import { pljevljaPolygonDelimiter } from './sandzak/pljevlja';
import { plavPolygonDelimiter } from './sandzak/plav';
import { rozajePolygonDelimiter } from './sandzak/rozaje';
import { sjenicaPolygonDelimiter } from './sandzak/sjenica';
import { tutinPolygonDelimiter } from './sandzak/tutin';

import { zoomChange } from './maps-polygons-zoomChange';

export class PolygonsBoundaries {
    noviPazarPolygon(map) {
        let noviPazarPolygon = new google.maps.Polygon({
            paths: noviPazarPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        noviPazarPolygon.setMap(map);
        zoomChange(map, noviPazarPolygon);
    }

    tutinPolygon(map) {
        let tutinPolygon = new google.maps.Polygon({
            paths: tutinPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        tutinPolygon.setMap(map);
        zoomChange(map, tutinPolygon);

    }

    sjenicaPolygon(map) {
        let sjenicaPolygon = new google.maps.Polygon({
            paths: sjenicaPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        sjenicaPolygon.setMap(map);
        zoomChange(map, sjenicaPolygon);

    }

    novaVarosPolygon(map) {
        let novaVarosPolygon = new google.maps.Polygon({
            paths: novaVarosPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        novaVarosPolygon.setMap(map);
        zoomChange(map, novaVarosPolygon);
    }

    prijepoljePolygon(map) {
        let prijepoljePolygon = new google.maps.Polygon({
            paths: prijepoljePolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        prijepoljePolygon.setMap(map);
        zoomChange(map, prijepoljePolygon);
    }

    pribojPolygon(map) {
        let pribojPolygon = new google.maps.Polygon({
            paths: pribojPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        pribojPolygon.setMap(map);
        zoomChange(map, pribojPolygon);
    }

    rozajePolygon(map) {
        let rozajePolygon = new google.maps.Polygon({
            paths: rozajePolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        rozajePolygon.setMap(map);
        zoomChange(map, rozajePolygon);
    }
    beranePolygon(map) {
        let beranePolygon = new google.maps.Polygon({
            paths: beranePolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        beranePolygon.setMap(map);
        zoomChange(map, beranePolygon);
    }
    andrijevicaPolygon(map) {
        let andrijevicaPolygon = new google.maps.Polygon({
            paths: andrijevicaPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        andrijevicaPolygon.setMap(map);
        zoomChange(map, andrijevicaPolygon);
    }
    bijeloPoljePolygon(map) {
        let bijeloPoljePolygon = new google.maps.Polygon({
            paths: bijeloPoljePolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        bijeloPoljePolygon.setMap(map);
        zoomChange(map, bijeloPoljePolygon);
    }
    plavPolygon(map) {
        let plavPolygon = new google.maps.Polygon({
            paths: plavPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        plavPolygon.setMap(map);
        zoomChange(map, plavPolygon);
    }
    pljevljaPolygon(map) {
        let pljevljaPolygon = new google.maps.Polygon({
            paths: pljevljaPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        pljevljaPolygon.setMap(map);
        zoomChange(map, pljevljaPolygon);
    }
    gusinjePolygon(map) {
        let gusinjePolygon = new google.maps.Polygon({
            paths: gusinjePolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        gusinjePolygon.setMap(map);
        zoomChange(map, gusinjePolygon);
    }
    petnjicaPolygon(map) {
        let petnjicaPolygon = new google.maps.Polygon({
            paths: petnjicaPolygonDelimiter,
            geodesic: true,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FC4445",
            fillOpacity: 0.43,
        });
        petnjicaPolygon.setMap(map);
        zoomChange(map, petnjicaPolygon);
    }

    drawPolgygons(map) {
        this.noviPazarPolygon(map);
        this.tutinPolygon(map);
        this.sjenicaPolygon(map);
        this.novaVarosPolygon(map);
        this.prijepoljePolygon(map);
        this.pribojPolygon(map);
        this.rozajePolygon(map);
        this.beranePolygon(map);
        this.petnjicaPolygon(map);
        this.andrijevicaPolygon(map);
        this.bijeloPoljePolygon(map);
        this.plavPolygon(map);
        this.pljevljaPolygon(map);
        this.gusinjePolygon(map);
    }

}
