/*
========================================================
Script to show the filter using amenities
========================================================
*/
$(document).ready(function () {
  // function to show the amenities checked by the user
  const dict = {};
  const countChecked = function () {
    if ($('.popover li input').prop('checked'), true) {
      const id = $(this).attr('data-id');
      const name = $(this).attr('data-name');
      if (dict.hasOwnProperty(id)) {
        delete dict[id];
      } else {
        dict[id] = name;
      }
      if (dict[id] === undefined) {
        delete dict[id];
      }
      const list = [];
      $.each(dict, function (key, val) {
        list.push(val);
      });
      $('.amenities h4').text(list);
    }
    return dict;
  };

  // calling the on click each time the user check one
  $('input[type=checkbox]').on('click', countChecked);
  // checking the API Status
  $.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('enable available');
    }
  });

  // making a POST to show initial places
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data, textStatus) {
      $.each(data, function (key, val) {
        $('.places').append(`
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
    error: function (jqXhr, textStatus, errorThrown) {
	  console.log(errorThrown);
    }
  });

  // searchin the amenities checked by the user
  $('button').click(function () {
    let dictToJson = JSON.stringify({ amenities: countChecked()});
      console.log('lista a buscar', dictToJson);
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: dictToJson,
      success: function (data, textStatus, jQxhr) {
	$('.places').html('');
	console.log(data);
        $.each(data, function (key, val) {
          $('.places').append(`
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
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  });
});
