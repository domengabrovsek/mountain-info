
let sidenavButton;

function init(){
    sidenavButton = document.getElementsByClassName("sidenav-btn")[0];
    
    //data from home page
    var data = JSON.parse(localStorage.getItem("details"));
    console.log(data);
    setVaues(data);

    //weather api
    var lon = data.coordinates.E.replace("," , ".");
    var lat = data.coordinates.N.replace("," , ".");
    loadJSON("http://localhost:3000/weather/lat=" + lat + "&lon=" + lon);


    //initialize gallery
    const activeImage = document.querySelector(".product-image .active");
    imgSrc(activeImage);
    const productImages = document.querySelectorAll(".image-list img");
    productImages[0].src = activeImage.src;
    imgSrc(productImages[1]);
    imgSrc(productImages[2]);
    function changeImage(e) {
        activeImage.src = e.target.src;
    }
    productImages.forEach(image => image.addEventListener("click", changeImage));
}

function imgSrc(image){
    var st = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    image.src = "./img/details" + st + ".jpg";
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                
                    console.log(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    console.log(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


/* Set the width of the side navigation to 240px or 0px */
function toggleNav() {
    let sidebarWidth = document.getElementById("sidebar");
    if (sidebarWidth.style.width == "" || sidebarWidth.style.width == "0px") {
        $(sidebarWidth).animate(
            { width: '+=240px' }, { duration: 200, queue: false }
        );
        $(sidenavButton).animate(
            { left: '+=240px' }, { duration: 200, queue: false }
        );
    } else {
        //sidebarWidth.style.width = "";
        $(sidebarWidth).animate(
            { width: '-=240px' }, { duration: 200, queue: false }
        );
        $(sidenavButton).animate(
            { left: '-=240px' }, { duration: 200, queue: false }
        );
    }
}


function setVaues(data){
    var heading = document.getElementById("heading");
    var country = document.getElementById("details-country");
    var mountainRange = document.getElementById("details-mountain-range");
    var altitude = document.getElementById("details-altitude");
    country.innerHTML="<b>Country:&nbsp&nbsp</b>" + data.country;
    mountainRange.innerHTML ="<b>Mountain range:&nbsp&nbsp</b>" + data.mountainRange;
    altitude.innerHTML = "<b>Altitude:&nbsp&nbsp</b>" + data.altitude + "m";
    heading.innerText = data.name; 
}