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
