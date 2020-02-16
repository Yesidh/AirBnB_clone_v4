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
  };
  countChecked();
  $( "input[type=checkbox]" ).on( "click", countChecked );

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textStatus) {
    if(textStatus === 'success') {
      $('#api_status').toggleClass('enable available');
    }
  });

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: "{}",
    success: function( data, textStatus){
      $.each(data, function(key, val) {
        $(".places").append(`
              <article>
                <div class="title">
                  <h2>${val.name}</h2>
                  <div class="price_by_night">
                    ${val.price_by_night}
                  </div>
                </div>
                <div class="information">
                  <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    <br />
                    ${val.max_guest} Guests
                  </div>
                  <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                    <br />
                    ${val.number_rooms} Bedrooms
                  </div>
                  <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                    <br />
                    ${val.number_bathrooms} Bathrooms
                  </div>
                </div>
                <div class="user">
                  <strong>Owner: PENDIENT</strong>
                </div>
                </div class="description">
                  ${val.description}
                </div>
              </article>`);
      });
     
    },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    }
  });
});
