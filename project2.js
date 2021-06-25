var m = document.getElementById("moves");
var moves = 0;
var t = document.getElementById("Timer");
var time = 0;
var question = document.getElementsByClassName("question");
var colors = ["#FF355E", "#FFFF66", "#0000ff", "#66ff66", "#6CDAE7", "#FF6EFF"];
var work = document.getElementsByClassName("work");
var index = null;
console.log(question);


var score=window.localStorage.getItem("highscore2");
if(score==null){
    document.getElementById("hiscore").innerHTML="Hi-Score:";}
    else{
document.getElementById('hiscore').innerHTML="Hi-Score: "+score+" moves";}


var sec=window.localStorage.getItem("besttime2");
if(sec==null){
document.getElementById("besttime").innerHTML="Best-Time:";}
else{
    document.getElementById("besttime").innerHTML="Best-Time:"+sec+" seconds";
}



// ########## block display start ###########
const alphaCount = 16;
const deltaCount = 36;

for (let i = 0; i < alphaCount; i++) {
  document.getElementById("alpha").innerHTML += `<div class="question" ></div>`;
}
// ########## block display end ###########
// document.getElementById("qwerty").classList.add("easy")
for (var i = 0; i < 16; i++) {
  var colr = colors[Math.floor(Math.random() * 6)];
  question[i].style.backgroundColor = colr;
}

function bigb() {
  document.getElementById("delta").style.display = "grid";
  // document.getElementById("delta").classList.add("workspace-show");
  for (let i = 0; i < deltaCount; i++) {
    document.getElementById("delta").innerHTML += `<div class="work"></div>`;
  }

  var ar = getarray();
  function getarray() {
    let temp, c;
    var a = [];
    for (var i = 0; i < 36; i++) a[i] = i;

    for (i = 0; i < 36; i++) {
      c = Math.floor(Math.random() * 25);
      temp = a[c];
      a[c] = a[i];
      a[i] = temp;
    }
    return a;
  }

  for (i = 0; i < 35; i++) {
    if (i < 16) {
      var colr = question[i].style.backgroundColor;
      work[ar[i]].style.backgroundColor = colr;
    } else {
      colr = colors[Math.floor(Math.random() * 6)];
      work[ar[i]].style.backgroundColor = colr;
    }
  }
 borderchange();
  work[ar[35]].style.backgroundColor = "bisque";
  index = ar[35];
}

var d = null;
document.getElementById("delta").addEventListener("click", (delta) => {
  if (work[index - 6] == delta.target && index >= 6) {
    //moving up
    d = work[index - 6].style.backgroundColor;
    work[index].style.backgroundColor = d;
    work[index - 6].style.backgroundColor = "bisque";
    index = index - 6;
    ++moves;
    m.innerHTML = "Moves: " + moves;
    condition = check();
  }
  if (work[index + 6] == delta.target && index <= 29) {
    //moving down
    d = work[index + 6].style.backgroundColor;
    work[index].style.backgroundColor = d;
    work[index + 6].style.backgroundColor = "bisque";
    index = index + 6;
    ++moves;
    m.innerHTML = "Moves: " + moves;
    condition = check();
  }
  if (work[index - 1] == delta.target && index % 6 != 0) {
    //moving left
    d = work[index - 1].style.backgroundColor;
    work[index].style.backgroundColor = d;
    work[index - 1].style.backgroundColor = "bisque";
    index = index - 1;
    ++moves;
    m.innerHTML = "Moves: " + moves;
    condition = check();
  }
  if (work[index + 1] == delta.target && index % 6 != 5) {
    //moving right
    d = work[index + 1].style.backgroundColor;
    work[index].style.backgroundColor = d;
    work[index + 1].style.backgroundColor = "bisque";
    index = index + 1;
    ++moves;
    m.innerHTML = "Moves: " + moves;
    condition = check();
  }
});

var condition = false;
// var s=document.getElementById("s")
// s.onclick=start();
function start() {
  bigb();
  seconds_stopwatch();
}

function seconds_stopwatch() {
  t.innerHTML ="Seconds:"+time;
  ++time;
  if (condition == false) setTimeout("seconds_stopwatch()", 1000);
  else if (condition == true){
    alert(
      "CONGRATULATIONS!!! You took " + moves + " moves and " + time + " seconds"
    );
    var tune=new Audio("gta_san_andreas.mp3");
    tune.play();
    if(score==null)
    {
        score=moves;
        windows.localStorage.setItem("highscore2",score);
        document.getElementById('hiscore').innerHTML="Hi-Score: "+score+" moves";
    }
     
     else if(moves<score)
         { window.localStorage.removeItem('highscore2')
         window.localStorage.setItem('highscore2',moves);
         document.getElementById('hiscore').innerHTML="Hi-Score: "+moves+" Moves";
         }
 
 
  if(sec==null)
 {sec=time;
     window.localStorage.setItem("besttime2",time);
     document.getElementById("besttime").innerHTML="Best-Time: "+time+" seconds";
 }
 
 else if(timer<sec){
     window.localStorage.removeItem("besttime2");
     window.localStorage.setItem("besttime2",time);
     document.getElementById("besttime").innerHTML="Best-Time: "+time+" seconds";
 }
    
}}

function check() {
  //to check if the task matches with the inner 3x3 grid
  for (var i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (
        question[i * 4 + j].style.backgroundColor !=
        work[(i + 1) * 6 + j + 1].style.backgroundColor
      )
        break;
    }
    if (j != 4) break;
  }
  if (i == 4 && j == 4) return true;
  else return false;
}



function borderchange() {
    //to check if the task matches with the inner 3x3 grid
    for (var i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
    
          
          work[(i + 1) * 6 + j + 1].style.border="solid black";
    
          
      }
      
    }
  
  }
  