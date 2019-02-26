//the preloader *************************
//var overlay = document.getElementById("overlay");

//window.addEventListener("load" , function(){
//overlay.style.display = "none";

//})
function preloader(secs){
    if (secs >= 4) {
      document.getElementById("overlay").style.display = "none";
    } else {
      setTimeout(function(){preloader(secs+1);},1000);
    }
  }
  window.onload = preloader(0);


//</preloader end ******************************


// overlay for start button ******************************

function on() {
  document.getElementById("overlayW98").style.display = "block";
}

function off() {
  document.getElementById("overlayW98").style.display = "none";
}
// overlay for start button ******************************


// overlay for start button ******************************
