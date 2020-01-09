
let sidenavButton;
let map;
let markacija;

function init(){
    initMap();
    sidenavButton = document.getElementsByClassName("sidenav-btn")[0];
    
    //data from home page
    var data = JSON.parse(localStorage.getItem("details"));
    setUpMap(data);
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
    map.setView([coordinatesArray[0], coordinatesArray[1]], 10);
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