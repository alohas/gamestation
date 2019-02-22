const template = document.querySelector("#myTemp").content;
const templateModal = document.querySelector("#modalTemp").content;
const main = document.querySelector("main");
const mainModal = document.querySelector(".forModals");



const openModal = document.querySelector("button.modalOpen");

const link = "https://spreadsheets.google.com/feeds/list/1StRDepKGILfDQMA7R8IXMSQUUZgsF7OL1uySCIfBLh4/od6/public/values?alt=json";






function loadJSON(link) {
    fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayGameData));
}

function displayGameData(item) {


    const clone = template.cloneNode("true");
    const mClone = templateModal.cloneNode("true");
    console.log(item);

    const article = clone.querySelector(".list-item");


    item.gsx$genre.$t.split(", ").forEach(genre => {
        article.classList.add(genre);
    })



    clone.querySelector(".thumbnail").src = "images/" + item.gsx$imagename.$t;
    mClone.querySelector(".thumbnailM").src = "images/" + item.gsx$imagename.$t;
    clone.querySelector("h3.title").textContent = item.gsx$title.$t;
    mClone.querySelector("h3.titleM").textContent = item.gsx$title.$t;


    clone.querySelector(".metascore").textContent = item.gsx$metascore.$t;
    mClone.querySelector(".metascoreM").textContent = item.gsx$metascore.$t;
    if (item.gsx$metascore.$t >= 75) {
        clone.querySelector(".metascore").style.backgroundColor = "#11FF00";
        mClone.querySelector(".metascoreM").style.backgroundColor = "#11FF00";
    } else if (item.gsx$metascore.$t >= 50) {
        clone.querySelector(".metascore").style.backgroundColor = "#FFE600";
        mClone.querySelector(".metascoreM").style.backgroundColor = "#FFE600";
    } else if (item.gsx$metascore.$t == false) {
        clone.querySelector(".metascore").style.display = "none";
        mClone.querySelector(".metascoreM").style.display = "none";
    } else {
        clone.querySelector(".metascore").style.backgroundColor = "#f00";
        mClone.querySelector(".metascoreM").style.backgroundColor = "#f00";
    }

    /* Genre and Release Date Converter added */

    clone.querySelector(".genre").textContent = item.gsx$genre.$t;


    var dateToConvert = new Date(item.gsx$releasedate.$t);

    var monthsTotal = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

    var date = dateToConvert.getDate();
    var month = dateToConvert.getMonth();
    var year = dateToConvert.getFullYear();

    var dateReleased = date + " " + monthsTotal[month] + " " + year;

    clone.querySelector(".relDate").textContent = dateReleased;

    if (item.gsx$discount.$t) {
        clone.querySelector(".price").textContent = Math.round(item.gsx$price.$t * (1 - item.gsx$discount.$t / 100)) + " Eur";
        mClone.querySelector(".priceM").textContent = Math.round(item.gsx$price.$t * (1 - item.gsx$discount.$t / 100)) + " Eur";;
    } else if (item.gsx$price.$t === "free") {
        clone.querySelector(".price").textContent = "FREE";
        article.classList.add(item.gsx$price.$t);
        mClone.querySelector(".priceM").textContent = "FREE";
    } else if (item.gsx$price.$t == false) {
        clone.querySelector(".price").textContent = "Coming Soon";
        mClone.querySelector(".priceM").textContent = "Coming Soon";
        article.classList.add("Unreleased");
    } else {
        clone.querySelector(".price").textContent = item.gsx$price.$t + " Eur";
        mClone.querySelector(".priceM").textContent = item.gsx$price.$t + " Eur";
    }

    clone.querySelector("button.modalOpen").setAttribute("id", item.gsx$id.$t);
    mClone.querySelector("button.modalHide").setAttribute("id", item.gsx$id.$t);

    mClone.querySelector(".genresM").textContent = item.gsx$genre.$t;
    mClone.querySelector(".developerM").textContent = item.gsx$developer.$t;
    mClone.querySelector(".publisherM").textContent = item.gsx$publisher.$t;
    mClone.querySelector(".relDateM").textContent = dateReleased;
    mClone.querySelector(".modeM").textContent = item.gsx$mode.$t;
    mClone.querySelector(".platformM").textContent = item.gsx$platform.$t;
    mClone.querySelector(".descriptionM").textContent = item.gsx$description.$t;





    if (item.gsx$agerange.$t >= 18) {
        mClone.querySelector(".age").src = "images/age18.jpg"
    } else if (item.gsx$agerange.$t >= 16) {
        mClone.querySelector(".age").src = "images/age16.jpg"
    } else if (item.gsx$agerange.$t >= 12) {
        mClone.querySelector(".age").src = "images/age12.jpg"
    } else if (item.gsx$agerange.$t >= 7) {
        mClone.querySelector(".age").src = "images/age7.jpg"
    } else if (item.gsx$agerange.$t >= 3) {
        mClone.querySelector(".age").src = "images/age3.jpg"
    }

    mClone.querySelector("div").setAttribute("id", item.gsx$id.$t);


    main.appendChild(clone);
    mainModal.appendChild(mClone);
}



function getIdShow(clicked_id) {
    console.log(clicked_id);
    showModal(clicked_id);
}

function getIdHide(clicked_id) {
    console.log(clicked_id);
    hideModal(clicked_id);
}

function showModal(id) {
    if (id < 10) {
        const modal = document.querySelector("div#\\3" + id);
        modal.classList.remove("hide");
    } else if (id < 20) {
        const modal = document.querySelector("div#\\31 " + (id - 10));
        modal.classList.remove("hide");
    }
}

function hideModal(id) {
    if (id < 10) {
        const modal = document.querySelector("div#\\3" + id);
        modal.classList.add("hide");
    } else if (id < 20) {
        const modal = document.querySelector("div#\\31 " + (id - 10));
        modal.classList.add("hide");
    }
}

let filter = document.querySelectorAll(".filter");

console.log(filter);

filter.forEach(filterOut);

function filterOut(a) {
    a.addEventListener("click", e => {
        const all = document.querySelectorAll(".list-item")
        console.log(e.target.dataset.filter);
        all.forEach(a => {
            if (a.classList.contains(e.target.dataset.filter)) {
                a.classList.remove("hide");
            } else {
                a.classList.add("hide");
            }
        })

    });
};


loadJSON(link);
