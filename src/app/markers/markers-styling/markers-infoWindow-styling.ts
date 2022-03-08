export function infoWindowStyling(markerInfo) {
    return (
        "<div class='infowindow'>" +
          "<div class='row'>" + 
            "<div class='col'>" +
              "<p class='lead'><i class='fa-solid fa-mosque'></i> - <i class='fa-solid fa-location-dot'></i> Naziv objekta / mjesta:</p>" +
               "<h4 class='mb-2'>" + markerInfo.placeName + "</h4>"  +
              "<hr>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-calendar-days'></i> Godina izgradnje: </strong></span>" +
                markerInfo.yearFounded +
              " godine</p>" +
              "<p class='lead'><span><strong><i class='fa-regular fa-map'></i> Katastarska parcela: </strong></span>" +
                markerInfo.cadastralParcelNumber +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-city'></i> Katastarska opština: </strong></span>" +
                markerInfo.cadastarMunicipality +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-map-location-dot'></i> Površina parcele: </strong></span>" +
                markerInfo.areaSize + " m<sup>2</sup>" +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-scroll'></i> List nepokretnosti: </strong></span>" +
                markerInfo.realEstateNumber +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-road'></i> Ulica: </strong></span>" + markerInfo.streetName + "</p>" +
              "<hr class='d-none d-sm-block d-md-none'>" +
            "</div>" + 
            "<div class='col'>"+ 
              "<p class='lead mt-2 mb-2'><span><strong><i class='fa-solid fa-image'></i> Slika objekta / Parcele: </strong></span>" + "</p>" + 
              
              "<img src='" + markerInfo.image + "' class='img-fluid img-thumbnail' width='100%' height='auto'" +   
            "</div>" +
          "</div>" +
        "</div>"
    );
}
