const template = document.querySelector("#myTemp").content;
const main = document.querySelector("main");
const modal = document.querySelector(".modal");


const link = "https://spreadsheets.google.com/feeds/list/1StRDepKGILfDQMA7R8IXMSQUUZgsF7OL1uySCIfBLh4/od6/public/values?alt=json";


function loadJSON(link) {
    fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayGameData));
}

function displayGameData(item) {

    const clone = template.cloneNode("true");
console.log(item);
    clone.querySelector(".thumbnail").src = "images/" + item.gsx$imagename.$t;
    clone.querySelector("h3.title").textContent = item.gsx$title.$t;


    clone.querySelector(".metascore").textContent = item.gsx$metascore.$t;
    if (item.gsx$metascore.$t >= 75) {
        clone.querySelector(".metascore").style.backgroundColor = "#6c3";
    } else if (item.gsx$metascore.$t >= 50) {
        clone.querySelector(".metascore").style.backgroundColor = "#fc3";
    } else if (item.gsx$metascore.$t == false) {
        clone.querySelector(".metascore").style.display = "none";
    } else {
        clone.querySelector(".metascore").style.backgroundColor = "#f00";
    }



    if (item.gsx$discount.$t) {
        clone.querySelector(".price").textContent = Math.round(item.gsx$price.$t * (1 - item.gsx$discount.$t / 100)) + " Eur";
    } else if (item.gsx$price.$t === "free") {
        clone.querySelector(".price").textContent = "FREE";
    } else if (item.gsx$price.$t == false) {
        clone.querySelector(".price").textContent = "Coming Soon";
    } else {
        clone.querySelector(".price").textContent = item.gsx$price.$t + " Eur";
    }





    clone.querySelector("article").addEventListener("click", () => {
        fetch(item.id.$t).then(e => e.json()).then(data => showModal(data));
    });

    main.appendChild(clone);
}


function showModal(id) {
    console.log(id);
    modal.classList.remove("hide")
}

loadJSON(link);
