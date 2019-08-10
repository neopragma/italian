var current = 0

function flip() { 
    if (document.getElementById("card-front").style.display=="none") {
        document.getElementById("card-front").style.display="block"
        document.getElementById("card-back").style.display="none"
    } else { 
        document.getElementById("card-front").style.display="none"
        document.getElementById("card-back").style.display="block"
    }
}
function set() {
    document.getElementById("card-front").innerHTML=cards[current].front
    document.getElementById("card-back").innerHTML=cards[current].back
    document.getElementById("cardnumber").innerHTML="Scheda " + (current + 1)
    if (cards[current].sound == null) {
        document.getElementById("no-sound").style.display="block"
        document.getElementById("sound").style.display="none"
    } else {
        document.getElementById("no-sound").style.display="none"
        document.getElementById("sound").style.display="block"
        document.getElementById("soundfile").src="audio/"+cards[current].sound 
    }
}
function previous() {
    if (current == 0) {
        current = cards.length - 1
    } else {
        current -= 1
    }
    set()
}
function next() {
    if (current == cards.length - 1) {
        current = 0
    } else {
        current += 1
    }
    set()
}
/* simplified version of sample from https://gist.github.com/kerimdzhanov/7529623 */
function random() {
  current = Math.floor(Math.random() * (cards.length - 1))
  set()
}
function settitle() {
    document.title = title;
    document.getElementById("pagetitle").innerHTML="Schede Flash: "+title
}
function list() {
    var txt="<table>";
    cards.forEach(function(entry) {
        var soundid = entry.front.replace(/'/g, 'A');
        txt += "<tr><td>" + entry.front + "</td>" 
        txt += "<td>" + entry.back + "</td>"
        txt += "<td><span><audio id=\"soundfile-" + soundid + "\" src=\"audio/" + entry.sound + "\" preload=\"auto\"></audio>"
        txt += "<a href=\"javascript:document.getElementById('soundfile-" + soundid + "').play()\">"
        txt += "<img src=\"img/speaker-on.png\" width=\"32\"/></a></span></td></tr>";
    });
    txt += "</table>"
    document.getElementById("allvalues").innerHTML=txt;
}