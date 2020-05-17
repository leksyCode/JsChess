var wScore = 0, bScore = 0;

function allowDrop(ev) {
    ev.preventDefault();
    
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);   
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    // data - current figure id, ev.target - figure under attack

    if (document.getElementById(ev.target.id) != null) { // if it's attack
        if ((ev.target.id.charAt(0) == 'b' && data.charAt(0) == 'w') || (ev.target.id.charAt(0) == 'w' && data.charAt(0) == 'b')) { // only different sides can beat each other
            // attacking   
            attack(ev);    
            setScore(ev);
            console.log(data + " has attacked: " + ev.target.id);
        }
    }
    else {
        // just step 
        makeStep(ev);
        console.log(data + " has moved: " + document.getElementById(ev.target.parentNode.id).id);
    }    
}

function attack(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.parentNode.replaceChild(document.getElementById(data), document.getElementById(ev.target.id));
}


function makeStep(ev) {
    var data = ev.dataTransfer.getData("text");
    var targetId = ev.target.parentNode.id;
    var currentId = document.getElementById(data).parentNode.parentNode.id;
 
    if (data.charAt(1) == 'P') {
        pawnStep(ev, targetId, currentId);
    }
    else if (data.charAt(1) == 'R') {
        rookStep(ev, targetId, currentId);
    }
    else if (data.charAt(1) == 'N') {
        knightStep(ev, targetId, currentId);
    }
    else {
        ev.target.appendChild(document.getElementById(data));
    }
}


// -- Specific steps --

function pawnStep(ev, targetId, currentId) {
    var data = ev.dataTransfer.getData("text");

    if (targetId.charAt(0) == currentId.charAt(0)) { // if targer in the same vertical coordinate
        if (data.charAt(0) == 'w') { // for white
             // if it's first pawn step
            if (currentId.charAt(1) == '2' && Number(targetId.charAt(1)) > Number(currentId.charAt(1)) && Number(targetId.charAt(1)) <= Number(currentId.charAt(1)) + 2) {
                // checks if trying to jump over figure
                if (document.getElementById(currentId.charAt(0) + (Number(currentId.charAt(1)) + 1)).firstElementChild.firstElementChild == null) {
                    ev.target.appendChild(document.getElementById(data));
                }                
            }
            else if (Number(targetId.charAt(1)) == Number(currentId.charAt(1)) + 1) {
                ev.target.appendChild(document.getElementById(data));
            }            
        }
        else if (data.charAt(0) == 'b') { // for black
            // if it's first pawn step
            if (currentId.charAt(1) == '7' && Number(targetId.charAt(1)) < Number(currentId.charAt(1)) && Number(targetId.charAt(1)) >= Number(currentId.charAt(1)) - 2) {
                // checks if trying to jump over figure
                if (document.getElementById(currentId.charAt(0) + (Number(currentId.charAt(1) - 1))).firstElementChild.firstElementChild == null) {
                    ev.target.appendChild(document.getElementById(data));
                }  
            }
            else if (Number(targetId.charAt(1)) == Number(currentId.charAt(1)) - 1) {
                ev.target.appendChild(document.getElementById(data));
            }                  
        }
    }   
}

function rookStep(ev, targetId, currentId) {
    var data = ev.dataTransfer.getData("text");

    if (targetId.charAt(0) == currentId.charAt(0) || targetId.charAt(1) == currentId.charAt(1)) { // if targer in the same vertical and gorizontal coordinate
        // Checks if there is another figure in the path
        if (checkVert(currentId.charAt(0), Number(currentId.charAt(1)), targetId.charAt(0), Number(targetId.charAt(1)))) {
            ev.target.appendChild(document.getElementById(data));
        }
    }      
}

function knightStep(ev, targetId, currentId) {
    var data = ev.dataTransfer.getData("text");
    // checking possibility to step into this cell
    if (currentId.charAt(0) == String.fromCharCode(targetId.charCodeAt(0) + 1)  || currentId.charAt(0) == String.fromCharCode(targetId.charCodeAt(0) - 1)) {
        if (Number(currentId.charAt(1)) == Number(targetId.charAt(1)) + 2 || Number(currentId.charAt(1)) == Number(targetId.charAt(1)) - 2) {
            ev.target.appendChild(document.getElementById(data));
        }        
    }
    else if (currentId.charAt(0) == String.fromCharCode(targetId.charCodeAt(0) + 2) || currentId.charAt(0) == String.fromCharCode(targetId.charCodeAt(0) - 2)) {
        if (Number(currentId.charAt(1)) == Number(targetId.charAt(1)) + 1 || Number(currentId.charAt(1)) == Number(targetId.charAt(1)) - 1) {
            ev.target.appendChild(document.getElementById(data));
        }  
    }
}

function checkVert(startX, startY, destX, destY) {     
    if (startY < destY) { // checking up
        while (startY != destY) {
            if (document.getElementById(startX + (startY + 1)).firstElementChild.firstElementChild!= null) {
                return false;
            }
            else {
                startY++;
            }
            if (startY == destY) {
                return true;
            }
        }  
    } 
    else if (startY > destY) { // checking down
        while (startY != destY) {
            if (document.getElementById(startX + (startY - 1)).firstElementChild.firstElementChild != null) {
                return false;
            }
            else {
                startY--;
            }
            if (startY == destY) {
                return true;
            }
        }  
    }
    else if (startX.charCodeAt(0) < destX.charCodeAt(0)) { // checking right
        while (startX != destX) {
            var nextVal = String.fromCharCode(startX.charCodeAt(0) + 1); // set next ASCII value
            if (document.getElementById(nextVal + startY).firstElementChild.firstElementChild != null) {
                return false;
            }
            else {
                startX = nextVal; 
            }
            if (startX == destX) {
                return true;
            }
        }  
    }
    else if (startX.charCodeAt(0) > destX.charCodeAt(0)) { // checking left
        while (startX != destX) {
            var nextVal = String.fromCharCode(startX.charCodeAt(0) - 1); // set next ASCII value
            if (document.getElementById(nextVal + startY).firstElementChild.firstElementChild != null) {
                return false;
            }
            else {
                startX = nextVal; 
            }
            if (startX == destX) {
                return true;
            }
        }
    }   
}

function setScore(ev) {
    var target = ev.target.id;
    var score = 0;

    
    if (target.charAt(1) == 'P') {
        score = 1;
    }
    else if (target.charAt(1) == 'R') {
        score = 5;
    }
    else if (target.charAt(1) == 'N') {
        score = 3;
    }
    else if (target.charAt(1) == 'B') {
        score = 3;
    }
    else if (target.charAt(1) == 'Q') {
        score = 9;
    }
    else if (target.charAt(1) == 'K') {
        score = 9999;
    }

    if (target.charAt(0) == 'b') {
        wScore += score;
        document.getElementById("wscore").firstElementChild.textContent = wScore;
    }
    else if (target.charAt(0) == 'w') {
        bScore += score;
        document.getElementById("bscore").firstElementChild.textContent = bScore;
    }    
}
