export function infoWindowStyling(markerInfo) {
    return (
        "<div class='infowindow'>" +
          "<div class='row'>" + 
            "<div class='col'>" +
              "<p class='lead'><i class='fa-solid fa-mosque'></i> - <i class='fa-solid fa-location-dot'></i> Naziv objekta / mjesta:</p>" +
               "<h4 class='mb-2'>" + markerInfo.placeName + "</h4>"  +
              "<hr>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-calendar-days'></i> Godina izgradnje: </strong></span>" +
                markerInfo.year_foundation +
              " godine</p>" +
              "<p class='lead'><span><strong><i class='fa-regular fa-map'></i> Katastarska parcela: </strong></span>" +
                markerInfo.katastar_parcela +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-city'></i> Katastarska opština: </strong></span>" +
                markerInfo.katastar_opstina +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-map-location-dot'></i> Površina parcele: </strong></span>" +
                markerInfo.pov_vakuf_parcele + " m<sup>2</sup>" +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-scroll'></i> List nepokretnosti: </strong></span>" +
                markerInfo.list_nepokretnosti +
              "</p>" +
              "<p class='lead'><span><strong><i class='fa-solid fa-road'></i> Ulica: </strong></span>" + markerInfo.naziv_ulice + "</p>" +
              "<hr class='d-none d-sm-block d-md-none'>" +
            "</div>" + 
            "<div class='col'>"+ 
              "<p class='lead mt-2 mb-2'><span><strong><i class='fa-solid fa-image'></i> Slika objekta / Parcele: </strong></span>" + "</p>" + 
              
              "<img src='" + markerInfo.img + "' class='img-fluid img-thumbnail' width='100%' height='auto'" +   
            "</div>" +
          "</div>" +
        "</div>"
    );
}
