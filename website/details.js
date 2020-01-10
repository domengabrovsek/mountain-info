
let sidenavButton;
let map;
let markacija;
let startMarkacija;
let paths;
let carouselIndicators;
let carouselElements;
let markers = L.markerClusterGroup();
let randomMountain = false;
let result = new Map();

const URL_ROUTES = " http://localhost:3000/mountainRoute/mountain/:id";
const URL_ID = "http://localhost:3000/mountain/:id";
const NUMBER_OF_ITEMS = 20;

function init(){
    sidenavButton = document.getElementsByClassName("sidenav-btn")[0];
    carouselIndicators = document.getElementById("indicators");
    carouselElements = document.getElementById("elements");
    
    //data from home page
    var data = JSON.parse(localStorage.getItem("details"));
    console.log(data);
    setValues(data);

    /* map data */
    initMap();
    setUpMap(data);

    //weather api
    var lon = data.coordinates.E.replace("," , ".");
    var lat = data.coordinates.N.replace("," , ".");
    loadJSON("http://localhost:3000/weather/lat=" + lat + "&lon=" + lon);

    /* paths */
    loadJSON(URL_ROUTES.replace(":id", data.id), saveData);


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
                if (success !== undefined) {
                    success(JSON.parse(xhr.responseText), createCarouselItems);
                }
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


function setValues(data){
    var heading = document.getElementById("heading");
    var country = document.getElementById("details-country");
    var mountainRange = document.getElementById("details-mountain-range");
    var altitude = document.getElementById("details-altitude");
    country.innerHTML="<b>Country:&nbsp&nbsp</b>" + data.country;
    mountainRange.innerHTML ="<b>Mountain range:&nbsp&nbsp</b>" + data.mountainRange;
    altitude.innerHTML = "<b>Altitude:&nbsp&nbsp</b>" + data.altitude + "m";
    heading.innerText = data.name; 
}

/* map */

function initMap(params) {
    const defaultLayer = initLayers();
    map = L.map('map', {
        layers: [defaultLayer]
    }).setView([46.1512, 14.9955], 9);
    L.control.layers(baseLayers, overlayLayers).addTo(map);
    markacija = L.icon({
        iconUrl:  './img/markacija.png',
        iconSize: [24, 24],
        iconAnchor: [0, 0],
        popupAnchor: [12, 12]
    });
    startMarkacija = L.icon({
        iconUrl:  './img/start_marker.png',
        iconSize: [24, 24],
        iconAnchor: [0, 0],
        popupAnchor: [12, 12]
      });
}

function setUpMap(data) {
    const element = data;
    const coordinates = element.coordinates;
    const name = element.name;
    const mountainRange = element.mountainRange;
    const altitude = element.altitude;
    //fix for commas as decimal
    let coordinatesArray = [];
    coordinatesArray[0] = parseFloat(coordinates.N.replace(",", "."));
    coordinatesArray[1] = parseFloat(coordinates.E.replace(",", "."));
    //add marker to marker group
    L.marker(coordinatesArray, {icon: markacija}).bindPopup(name +"<br>"+altitude+"m<br>"+mountainRange).addTo(map);
    map.setView([coordinatesArray[0], coordinatesArray[1]], 12);
}

function initLayers(params) {
    const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 8,    
        maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 8,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    const OpenMapSurfer_Hillshade = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/asterh/webmercator/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 18,
	    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data  <a href="https://lpdaac.usgs.gov/products/aster_policies">ASTER GDEM</a>, <a href="http://srtm.csi.cgiar.org/">SRTM</a>'
    });

    const OpenMapSurfer_Roads = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        minZoom: 8,    
        maxZoom: 19,
	    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
	    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
	    minZoom: 8,
	    maxZoom: 19
    });

    const StamenTopo = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    baseLayers = {
        "OSM Roads": OpenStreetMap_Mapnik,
        "ESRI Topo": Esri_WorldTopoMap,
        "OMS Roads": OpenMapSurfer_Roads,
        "Wikimedia": Wikimedia,
        "Stamen Topo": StamenTopo
    };

    overlayLayers = {
        "OMS Topo": OpenMapSurfer_Hillshade
    };

    return OpenMapSurfer_Roads;
}

/* paths */

function saveData(data, callback) {
    paths = new Array();
    /* save all paths from mountain to paths array */

    if (Array.isArray(data)) {
        data.forEach(element => {
            paths.push(element);
        });
    } else {
        paths.push(element);
    }
    callback();
}

function createCarouselItems() {

    if (randomMountain) {
        randomMountain = false;
        localStorage.setItem("details",JSON.stringify(Array.from(result)[0][1]));
        location.pathname = "/website/details.html";
    }
    
    for (let index = 0; index < paths.length; index++) {
        const path = paths[index];

        /* marker for start position */
        let coordinatesArray = [];
        if (path.startCoordinates.N !== undefined && path.startCoordinates.E !== undefined && /[^a-z ščđćž]/i.test(path.startCoordinates.N) && /[^a-z ščđćž]/i.test(path.startCoordinates.E)) {
            coordinatesArray[0] = parseFloat(path.startCoordinates.N.replace(",", "."));
            coordinatesArray[1] = parseFloat(path.startCoordinates.E.replace(",", "."));
            markers.addLayer(L.marker(coordinatesArray, {icon: startMarkacija}).bindPopup(path.name));
        }

        let div = document.createElement("div");
        div.classList.add("carousel-item");

        let li = document.createElement("li");
        li.setAttribute("data-target", "#ourCarousel");
        li.setAttribute("data-slide-to", index);
        
        if (index == 0) {
            div.classList.add("active");
            li.classList.add("active");
        }

        div.innerHTML = "<h5 class='result-item-heading'>" + path.name + "</h5>";

        /* start location */
        let divStart = document.createElement("div");
        divStart.innerHTML = "<i class='material-icons result-item-icon'>explore</i><p class='path-item-text'>Start: " + path.startName + "</p>";

        /* finish location */
        let divFinish = document.createElement("div");
        divFinish.innerHTML = "<i class='material-icons result-item-icon'>room</i><p class='path-item-text'>Finish: " + path.endName + "</p>";

        /*  path length */
        let divLength = document.createElement("div");
        divLength.innerHTML = "<i class='material-icons result-item-icon'>timer</i><p class='path-item-text'>Time: " + path.time + "</p>";

        /*  altitude */
        let divAltitude = document.createElement("div");
        divAltitude.innerHTML = "<i class='material-icons result-item-icon'>terrain</i><p class='path-item-text'>Altitude difference: " + path.altitudeDifference + "</p>";

        /*  difficult */
        let divDifficult = document.createElement("div");
        divDifficult.innerHTML = "<i class='material-icons result-item-icon'>linear_scale</i><p class='path-item-text'>Difficult: " + path.difficultLevel + "</p>";


        let dataWrapper = document.createElement("div");
        dataWrapper.style.margin = "10px";
        dataWrapper.style.marginTop = "20px";

        dataWrapper.appendChild(divStart);
        dataWrapper.appendChild(divFinish);
        dataWrapper.appendChild(divLength);
        dataWrapper.appendChild(divAltitude);
        dataWrapper.appendChild(divDifficult);

        div.appendChild(dataWrapper);
        
        carouselIndicators.appendChild(li);
        carouselElements.appendChild(div);
    }
    markers.addTo(map);
}

function randomId() {
    randomMountain = true;
    let id = Math.floor(Math.random() * NUMBER_OF_ITEMS - 1) + 1;
    randomMountain = true;
    loadJSON(URL_ID.replace(":id", id), convertData, randomId);
}

function convertData(data, callback) {
    result = new Map();
    /* save all mountains from search to result map */

    if (Array.isArray(data)) {
        data.forEach(element => {
            result.set(element.name, element);
        });
    } else {
        result.set(data.name, data);
    }
    callback();
}