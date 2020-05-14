function allowDrop(ev) {
        ev.preventDefault();
  }
  
function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
  }
  
function drop(ev) {
        ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    var whiteFig = ['wP1', 'wP2', 'wP3', 'wP3', 'wP4', 'wP4', 'wP5', 'wP6', 'wP7', 'wP8', 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB2', 'wN2', 'wR2'];
    var blackFig = ['wP1', 'wP2', 'wP3', 'wP3', 'wP4', 'wP4', 'wP5', 'wP6', 'wP7', 'wP8', 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB2', 'wN2', 'wR2'];

    
    if (document.getElementById(ev.target.id) != null) {
        if ((ev.target.id.charAt(0) == 'b' && data.charAt(0) == 'w') || (ev.target.id.charAt(0) == 'w' && data.charAt(0) == 'b')) {
            // attack
            ev.target.parentNode.replaceChild(document.getElementById(data), document.getElementById(ev.target.id));         
        }     
    }
    else { // simple move  

        ev.target.appendChild(document.getElementById(data));
    }

   
   
    
  }
  