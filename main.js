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

  let html = "";
  for(let i = 0; i < data.events.length; i ++) {

    let curr = data.events[i];
    html += `
      <div class="event-container ${curr.panel ? "" : "grayed"}" ${curr.panel ? `onclick="panel(${i})"` : ""}>
        <h2 class="event-title">${curr.title}</h2>
        <p class="event-date">${curr.date}</p>
        <p class="event-location">${curr.location}</p>
      </div>
    `;

  }

  getID("events").innerHTML = html;

}

function panel(id) {

  getID("panel").style.opacity = 1;
  getID("panel").style.pointerEvents = "auto";

  getID("panel-bg").style.opacity = 1;
  getID("panel-bg").style.pointerEvents = "all";

  document.body.style.overflow = "hidden";

  let curr = data.events[id],
      text = "";

  if(typeof curr.panel.text === "object") {

    for(let i = 0; i < curr.panel.text.length; i++) {
      
      let currText = curr.panel.text[i];
      for(let j = 0; j < currText.length; j++) {
        if(currText[j] === ' ') currText.replace(' ', "&nbsp;");
        else break;
      }
      text += currText + "<br>";
      
    }

  } else text = curr.panel.text;

  getID("panel-title").innerHTML = curr.title;
  getID("panel-text").innerHTML = text;

}

function panelClose() {

  getID("panel").style.opacity = 0;
  getID("panel").style.pointerEvents = "none";

  getID("panel-bg").style.opacity = 0;
  getID("panel-bg").style.pointerEvents = "none";

  document.body.style.overflow = "visible";

}
