/*

*/
$(document).ready(function () {
  let dict = {};
  var countChecked = function () {
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
      console.log(dict);
      let list_n = []
      $.each(dict, function (key, val) {
        list_n.push(val)
      });
      $('.amenities h4').text(list_n);
    }
  };
  countChecked();
  $( "input[type=checkbox]" ).on( "click", countChecked );

});
