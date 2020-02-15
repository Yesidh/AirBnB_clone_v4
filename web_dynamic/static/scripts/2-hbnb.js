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
});
