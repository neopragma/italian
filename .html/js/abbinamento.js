// abbinamento.js
var numberOfEntries = cards.length
var shuffled = new Array(numberOfEntries)
var leftSide = ""
var rightSide = ""
var originalEntries = ""

function randomizeIndices() {
  document.title = title
  document.getElementById("title").innerHTML = title

  for(var i=0; i<shuffled.length; i++) {
    shuffled[i] = i 
  }
  // Fisher-Yates shuffle algorithm
  var j, x, i;
  for (var i = shuffled.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = x;
  }
  for (var i = 0 ; i < shuffled.length ; i++) {
    makeDragBox(i, shuffled[i])
  }
}

function makeDragBox(cardIndex, shuffledIndex) {
  // model code to be generated for the left side of the display
  //
  // <div class="dragbox" id="left-1" ondrop="drop(event)" ondragover="allowDrop(event)">
  //   <span id="textsource-1" draggable="true" ondragstart="saveSourceId(this.id);drag(event)">Io sono Italiano</span>
  // </div>

  leftSide += "<div class=\"dragbox\" id=\"left-"+shuffledIndex+"\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">"
  leftSide += "<span id=\"textsource-"+cardIndex+"\" draggable=\"true\" ondragstart=\"saveSourceId(this.id);drag(event)\">"+cards[cardIndex].front+"</span></div>"

  // model code to be generated for the right side of the display
  //
  // <div class="dragbox" id="right-2" ondrop="this.innerHTML='';drop(event);check(this.id,event)" ondragover="allowDrop(event)"></div>

  rightSide += "<div class=\"dragbox\" id=\"right-"+shuffledIndex+"\" ondrop=\"this.innerHTML='';drop(event);check(this.id,event)\" ondragover=\"allowDrop(event)\"></div>"

  // model code to be generated for the original entries
  // 
  // <div class="originalbox" id="original-2">
  //   We are together
  // </div>

  originalEntries += "<div class=\"dragbox\" id=\"original-"+shuffledIndex+"\">"+cards[shuffledIndex].back+"</div>"

  document.getElementById("leftside").innerHTML = leftSide
  document.getElementById("rightside").innerHTML = rightSide
  document.getElementById("originalentries").innerHTML = originalEntries
}

sourceId=""

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  nodeCopy.id = "copied" + nodeCopy.id; /* We cannot use the same ID */
  event.target.appendChild(nodeCopy)
}

function check(destinationId, mouseEvent) {
//  alert("sourceId " + sourceId + ", target " + destinationId + " received " + mouseEvent.target.id + " with content " + mouseEvent.target.innerText);
  var elem = document.getElementById(destinationId)
  var sourceIndex = sourceId.indexOf("-") + 1
  var sourceLabel = sourceId.substr(sourceIndex)
  var destinationIndex = destinationId.indexOf("-") + 1
  var destinationLabel = destinationId.substr(destinationIndex)

//alert("sourceLabel=" + sourceLabel + ", destinationLabel="+destinationLabel)

  if (sourceLabel == destinationLabel) {
    elem.setAttribute("style", "background-color: #00ff00;")
  } else {
    elem.setAttribute("style", "background-color: #ff9999;")
  }
  clearSourceId()
}

function saveSourceId(id) {
  sourceId = id
}
function clearSourceId() {
  sourceId = ""
}
