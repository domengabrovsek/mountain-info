'use strict';
let map;
let baseLayers;
let overlayLayers;
let markacija;

const url = "http://localhost:3000/mountain/";

function onLoad(params) {
    markacija = L.icon({
        iconUrl:  './markacija.png',
        iconSize: [32, 32],
        iconAnchor: [0, 0],
      });
    initMap();
    // WIP
    //displayAllData();
}

function initMap(params) {
    const defaultLayer = initLayers();
    map = L.map('mapid', {
        layers: [defaultLayer]
    }).setView([46.1512, 14.9955], 9);
    L.control.layers(baseLayers, overlayLayers).addTo(map);
    populateMap();
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

    return Wikimedia;
}

function displayAllData(params) {
    const markers = L.markerClusterGroup();

    for (let id = 1; id < 3; id++) {
        getMountain(id);
    }
    markers.addTo(map);
}

function getMountain(id) {
    console.log("getMountain-"+id);
    console.log(url+id);
    /*getJSON*/
    $.get(url+id, function(data) {
        console.log("downloading from db");
        console.log(data);
    });
}

function populateMap(params) {
    const markers = L.markerClusterGroup();
    markers.addLayer(L.marker([46.37823, 13.83648], {icon: markacija}).bindPopup("Triglav"));
    markers.addLayer(L.marker([46.43277, 13.82114], {icon: markacija}).bindPopup("Škrlatica"));
    markers.addLayer(L.marker([46.37683, 13.84315], {icon: markacija}).bindPopup("Mali Triglav"));
    markers.addLayer(L.marker([46.43948, 13.65457], {icon: markacija}).bindPopup("Mangart"));
    markers.addLayer(L.marker([46.43499, 13.82797], {icon: markacija}).bindPopup("Visoki Rokav"));
    markers.addLayer(L.marker([46.42154, 13.68002], {icon: markacija}).bindPopup("Jalovec"));
    markers.addLayer(L.marker([46.43968, 13.82998], {icon: markacija}).bindPopup("Veliki Oltar"));
    markers.addLayer(L.marker([46.42579, 13.81385], {icon: markacija}).bindPopup("Dolkova špica"));
    markers.addLayer(L.marker([46.41316, 13.79196], {icon: markacija}).bindPopup("Razor"));
    markers.addLayer(L.marker([46.44179, 13.82419], {icon: markacija}).bindPopup("Velika Martuljška Ponca"));
    markers.addLayer(L.marker([46.36018, 13.439], {icon: markacija}).bindPopup("Visoki Kanin"));
    markers.addLayer(L.marker([46.35727, 13.43765], {icon: markacija}).bindPopup("Mali Kanin"));
    markers.addLayer(L.marker([46.3602, 13.80966], {icon: markacija}).bindPopup("Kanjavec"));
    markers.addLayer(L.marker([46.35718, 13.53548], {icon: markacija}).bindPopup("Grintovec"));
    markers.addLayer(L.marker([46.3767, 13.82755], {icon: markacija}).bindPopup("Glava v Zaplanji"));
    markers.addLayer(L.marker([46.42464, 13.76974], {icon: markacija}).bindPopup("Prisojnik"));
    markers.addLayer(L.marker([46.42795, 13.81129], {icon: markacija}).bindPopup("Rogljica"));
    markers.addTo(map);
}
