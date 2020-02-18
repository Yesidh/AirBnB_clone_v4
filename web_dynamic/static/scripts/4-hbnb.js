/*

*/
$(document).ready(function () {
  let dict = {};
  let countChecked = function () {
    if($( ".popover li input" ).prop("checked"), true) {
      let id = $(this).attr("data-id");
      let name = $(this).attr("data-name");
      if (dict.hasOwnProperty(id)) {
        delete dict[id];
      } else {
        dict[id] = name;
      }
      if (dict[id] == undefined) {
        delete dict[id];
      }
      let list_n = []
      $.each(dict, function (key, val) {
        list_n.push(val)
      });
      $('.amenities h4').text(list_n);
    }
      return dict;
  };
  $( "input[type=checkbox]" ).on( "click", countChecked );

  $.get('http://localhost:5001/api/v1/status/', function(data, textStatus) {
    if(textStatus === 'success') {
      $('#api_status').toggleClass('enable available');
    }
  });

  $.ajax({
    url: "http://localhost:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: "{}",
    success: function( data, textStatus, jQxhr ){
      $.each(data, function (index, val) {
        $('.title h2').text(val.name)
        $('.price_by_night').text(val.price_by_night)
        $('.max_guest').append(val.max_guest + " Guests")
        $('.number_rooms').append(val.number_rooms + " Bedrooms")
        $('.number_bathrooms').append(val.number_bathrooms + " Bathroom")
        console.log(val);

      });

    },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    }
  });

    $('button').click(function () {
      let alguito = countChecked();
      let algo_mas = JSON.stringify(alguito);
      console.log(alguito);
	console.log(algo_mas);
	$.ajax({
	    url: "http://localhost:5001/api/v1/places_search/",
	    type: "POST",
	    contentType: "application/json",
	    data: algo_mas,
	    success: function( data, textStatus, jQxhr ){
		console.log('en el post', data);
	    },
	});
    });


});
