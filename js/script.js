function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
$(function() {
  $('.map').maphilight();
});
function hilightArea(planet) {
  //Unhilights every planet
  $("area").each(function() {
    var data = $(this).mouseout().data('maphilight') || {};
    data.alwaysOn = false;
    $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
  });
  //hilights selected planet
  let id = $(planet).data('planet');
  var data = $('#' + id).mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#' + id).data('maphilight', data).trigger('alwaysOn.maphilight');
}