var map;
var daysArr = [{hotel: null, restaurant: [], activities: [], markers: []}];
var whichDay = 0;
var originMarker;
var myLatlng
var bounds = new google.maps.LatLngBounds();

function initialize_gmaps() {
    // initialize new google maps LatLng object
    myLatlng = new google.maps.LatLng(41.842089,-87.672945);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    originMarker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    bounds.extend(originMarker.position)
    // Add the marker to the map by calling setMap()
    originMarker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();
    $(hotels).each(function(index) {
        $('#hotel-choices').append(`<option>${this.name}</option>`)
    })
    $(restaurants).each(function(index) {
        $('#restaurant-choices').append(`<option>${this.name}</option>`)
    })
    $(activities).each(function(index) {
        $('#activity-choices').append(`<option>${this.name}</option>`)
    })

    $('#options-panel').on('click', 'button', function() {
        let $choice = $($(this).siblings('select')[0])
        if($choice.attr('data-type') === 'hotel'){

            let chosenHotel
            let hotelChoice = $('#hotel-choices option:selected').val()
            $(hotels).each(function(){
                if (this.name === hotelChoice) {
                    chosenHotel = this
                }
            })
            var hotelLocation = new google.maps.LatLng(chosenHotel.place.location[0],chosenHotel.place.location[1])
            let newMarker = new google.maps.Marker({
              position: hotelLocation,
              title: chosenHotel.name
            })

            if (!$('#hotel-item').children('.title').length) {
                $('#hotel-item').prepend(`<span class="title">${hotelChoice}</span>`)
                daysArr[whichDay].markers.push(newMarker)
                newMarker.setMap(map);
                daysArr[whichDay].hotel = chosenHotel
            } else {
                $('#hotel-item > .title').text(hotelChoice)
                daysArr[whichDay].markers[0].setMap(null)
                daysArr[whichDay].markers[0] = newMarker
                newMarker.setMap(map)
                daysArr[whichDay].hotel = chosenHotel
            }
            bounds.extend(newMarker.position)
            map.fitBounds(bounds)
        }

    })

    $('#hotel-item').on('click','button', function(){
        $('#hotel-item button').siblings('.title').remove()
        markers.hotel[0].setMap(null)
    })

    $('#day-add').on('click', function(){
        $(this).before(`<button class="btn btn-circle day-btn">${$('.day-buttons').children().length}</button>`)
        daysArr.push({hotel: null, restaurants: [], activities: [], markers: []})
    })

     $('.day-buttons').on('click', 'button', function(){
       if ($(this).text() !== '+') {
           if (whichDay !== +$(this).text() - 1) {
                daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(null)
                })
                whichDay = +$(this).text() - 1
                $('#day-title > span').text(`Day ${whichDay + 1}`)
                $('#hotel-item .title').remove()
                if (daysArr[whichDay].hotel) {
                    $('#hotel-item').prepend(`<span class="title">${daysArr[whichDay].hotel.name}</span>`)
                }
                bounds = new google.maps.LatLngBounds()
                daysArr[whichDay].markers.forEach(function(marker) {
                    bounds.extend(marker)
                    marker.setMap(map)
                })
                originMarker.setMap(map)
                bounds.extend(originMarker)
                map.fitBounds(bounds)
           }
       }
    })

    $('#day-title').on('click', 'button', function() {

        if(whichDay === daysArr.length - 1 ) {
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(null)
                })
            $(`.day-buttons button:eq(${whichDay})`).remove()
            daysArr.splice(whichDay, 1)
            whichDay--
            $('#day-title > span').text(`Day ${whichDay + 1}`)
            $('#hotel-item .title').remove()
            if (daysArr[whichDay].hotel) {
                $('#hotel-item').prepend(`<span class="title">${daysArr[whichDay].hotel.name}</span>`)
            }
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(map)
                })
        } else if(whichDay === 0) {
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(null)
                })
            $(`.day-buttons button:eq(${whichDay})`).remove()
            $('.day-buttons').children('button').each(function() {
                if ($(this).text() !== '+') {
                    $(this).text($(this).text() - 1)
                }
             })
            daysArr.shift()
            $('#hotel-item .title').remove()
            if (daysArr[whichDay].hotel) {
                $('#hotel-item').prepend(`<span class="title">${daysArr[whichDay].hotel.name}</span>`)
            }
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(map)
                })
        } else {
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(null)
                })
            for(var i = whichDay + 1; i < daysArr.length; i++) {
                $(`.day-buttons button:eq(${i})`).text(i)
            }
            $(`.day-buttons button:eq(${whichDay})`).remove()
            daysArr.splice(whichDay, 1)
            $('#hotel-item .title').remove()
            if (daysArr[whichDay].hotel) {
                $('#hotel-item').prepend(`<span class="title">${daysArr[whichDay].hotel.name}</span>`)
            }
            daysArr[whichDay].markers.forEach(function(marker) {
                    marker.setMap(map)
                })
        }
    })
});
