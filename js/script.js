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
  $('.map').maphilight({fillColor:'ff1414', fillOpacity: 1});
  magnify("planets", 3);
  $('img[usemap]').rwdImageMaps();
});

window.oncontextmenu = (e) => {
  e.preventDefault();
}
function hilightArea(planet) {
  //Unhilights every planet
  clearHilights();
  //hilights selected planet
  let id = $(planet).data('planet');
  var data = $('#' + id).mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#' + id).data('maphilight', data).trigger('alwaysOn.maphilight');
}

function clearHilights() {
  $("area").each(function() {
    var data = $(this).mouseout().data('maphilight') || {};
    data.alwaysOn = false;
    $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
  });
}
function toggle() {
    let dropDown = document.getElementById("myDropdown");
    let input = document.getElementById("myInput");
    dropDown.classList.toggle("show");
    if (dropDown.classList.contains("show")) {
      input.focus();
      input.value = "";
      filterFunction();
    }
}

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  glass.setAttribute("id", "glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

function swap() {
  let glass = $('#glass');
  let page = $('#page');
  glass.css("display", glass.css("display") === 'none' ? '' : 'none');
  page.css("cursor", page.css("cursor") === 'none' ? 'auto' : 'none'); 
  clearHilights();
}