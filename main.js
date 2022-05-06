function getID(elementID) {
  return document.getElementById(elementID);
}

var data;
function load() {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        data = JSON.parse(xhttp.responseText);
        loadEvents();

      }
  };

  xhttp.open("GET", "data.json", true);
  xhttp.send();

}

function loadEvents() {

}

function panel(id) {

  getID("panel").style.opacity = 1;
  getID("panel").style.pointerEvents = "auto";

  getID("panel-bg").style.opacity = 1;
  getID("panel-bg").style.pointerEvents = "all";

  getID("panel-title").innerHTML = data.events[id].title;
  getID("panel-text").innerHTML = data.events[id].panel.text;

}

function panelClose() {

  getID("panel").style.opacity = 0;
  getID("panel").style.pointerEvents = "none";

  getID("panel-bg").style.opacity = 0;
  getID("panel-bg").style.pointerEvents = "none";

}