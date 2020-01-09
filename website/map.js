'use strict';
let map;
let baseLayers;
let overlayLayers;
let markacija;
let data;
const markers = L.markerClusterGroup();

const URL = "http://localhost:3000/mountains";

function onLoad(params) {
    markacija = L.icon({
        iconUrl:  './img/markacija.png',
        iconSize: [24, 24],
        iconAnchor: [0, 0],
        popupAnchor: [12, 12]
      });
    initMap();
    displayAllData();
}

function initMap(params) {
    const defaultLayer = initLayers();
    map = L.map('mapid', {
        layers: [defaultLayer]
    }).setView([46.1512, 14.9955], 9);
    L.control.layers(baseLayers, overlayLayers).addTo(map);
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

function displayAllData(params) {
    loadJSON(URL, addMarker);
    markers.addTo(map);
}

function addMarker(result) {
    //db data
    data = result;
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const coordinates = element.coordinates;
        const name = element.name;
        const mountainRange = element.mountainRange;
        const altitude = element.altitude;
        const position = i;
        //fix for commas as decimal
        let coordinatesArray = [];
        coordinatesArray[0] = parseFloat(coordinates.N.replace(",", "."));
        coordinatesArray[1] = parseFloat(coordinates.E.replace(",", "."));
        //add marker to marker group
        markers.addLayer(L.marker(coordinatesArray, {icon: markacija}).bindPopup(
            "<a onclick='openMountain("+position+")' style='cursor: pointer;'>"+name +"<br>"+altitude+"m<br>"+mountainRange+"</a>"));
    }    
}

function openMountain(params) {
    console.log("opening mountain: "+data[params].name);
    console.log(Array.from(data)[params]);
    localStorage.setItem("details",JSON.stringify(Array.from(data)[params]));
    location.pathname = "/website/details.html";
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
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
        $(document.getElementsByClassName("sidenav-btn")[0]).animate(
            { left: '+=240px' }, { duration: 200, queue: false }
        );
        $(document.getElementById("mapid")).animate(
            { left: '+=12.5vw', width: '-=12.5vw'}, { duration: 200, queue: false }
        );
    } else  {
        //sidebarWidth.style.width = "";
        $(sidebarWidth).animate(
            { width: '-=240px' }, { duration: 200, queue: false }
        );
        $(document.getElementsByClassName("sidenav-btn")[0]).animate(
            { left: '-=240px' }, { duration: 200, queue: false }
        );
        $(document.getElementById("mapid")).animate(
            { left: '-=12.5vw', width: '+=12.5vw'}, { duration: 200, queue: false }
        );
    }  
}