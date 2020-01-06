'use strict';

let searchBox;
let searchButton;
let searchInputAll;
let options;
let toggleAdvencedOptions;
let sidenavButton;

/* Default */
const SEARCHBOX_HEIGHT = '44px';
const URL_NAME = "http://localhost:3000/mountain/name/:name";
const URL_MIN_MAX_HEIGHT = "http://localhost:3000/mountain/min/:min/max/:max";
const URL_MIN_HEIGHT = "http://localhost:3000/mountain/altitude/:altitude";

/* Search result */
let result = new Map();
let numberOfWaitingResults = 0;

/* Advanced search options */
let nameOpt;
let heightOpt;
let minHeightOpt;
let maxHeightOpt;
//let rangeOpt;
//let countryOpt;

let selectedOptions = new Map();

function init(params) {
    //console.log("init");
    searchBox = document.getElementById("search-div");
    searchButton = document.getElementById("search-button");
    searchInputAll = document.getElementById("search-input-all");
    options = document.getElementById("options");
    toggleAdvencedOptions = document.getElementById("more-opt");
    sidenavButton = document.getElementsByClassName("sidenav-btn")[0];

    nameOpt = document.getElementById("name");
    heightOpt = document.getElementById("height");
    minHeightOpt = document.getElementById("min-height");
    maxHeightOpt = document.getElementById("max-height");
    /* Not implemented */
    //rangeOpt = document.getElementById("mountain-range");
    //countryOpt = document.getElementById("country");

    searchButton.addEventListener("click", getData, true);

    /* Enter button same as clicking on search */
    $(document).on("keyup", function (e) {
        if (e.which == 13) {
            searchButton.click();
        }
    });

    /* Toggle more options */
    toggleAdvencedOptions.addEventListener("click", toggleOptions, true);

    /*$(document).click(function(event) {
        var text = $(event.target);
        console.log(text);
    });*/
}

function toggleOptions() {
    //console.log("toggle options");
    $(options).slideToggle(400);
}

function clickOnOption(option) {
    let displayMode;
    /* Firstly check if you want to remove or add clicked option */
    if (selectedOptions.has(option.parentElement.id)) {
        /* Remove option from map */
        selectedOptions.delete(option.parentElement.id);
        /* Move option back to options-container */
        $(option.parentElement.getElementsByTagName("input")).val('');
        options.appendChild(option.parentElement);
        displayMode = "none";
    } else {
        displayMode = "block";
        /* Add option to array */
        selectedOptions.set(option.parentElement.id, option.parentElement);
        /* Hide universal search input */
        searchInputAll.style.visibility = "hidden";
        /* Move option to search bar */
        searchBox.appendChild(option.parentElement);
    }
    /* If no options are selected shoe universal input */
    if (selectedOptions.size == 0) {
        searchInputAll.style.visibility = "visible";
    }

    /* Hide or show input field for clicked option */
    switch (option.parentElement) {
        case nameOpt:
            nameOpt.children[1].style.display = displayMode;
            break;
        case heightOpt:
            heightOpt.children[1].style.display = displayMode;
            break;
        case minHeightOpt:
            minHeightOpt.children[1].style.display = displayMode;
            break;
        case maxHeightOpt:
            maxHeightOpt.children[1].style.display = displayMode;
            break;
        case rangeOpt:
            rangeOpt.children[1].style.display = displayMode;
            break;
        case countryOpt:
            countryOpt.children[1].style.display = displayMode;
            break;
        default:
            break;
    }

    /* Regulate search box height */
    if (selectedOptions.size == 0) {
        searchInputAll.style.visibility = "visible";
        document.documentElement.style.setProperty('--searchbox-height', SEARCHBOX_HEIGHT);
    } else {
        /* Make it bigger than default */
        checkSearchBoxSize();
    }
}

function checkSearchBoxSize(params) {
    //console.log($(searchBox).height());
    document.documentElement.style.setProperty('--searchbox-height', $(searchBox).height() + "px");
}

function getData(params) {

    //move logo away
    let logo = document.getElementById("logo");
    logo.style.display = "none";
    let sbox = document.getElementById("search-box");
    sbox.style.borderRadius = "0px 0px 22px 22px";
    
    /* Check if no advanced options are selected */
    if (selectedOptions.size == 0) {
        let searchPhrases = $(searchInputAll).val().trim().split(/\s+/);
        let numbersCount = 0;
        let minAltitude = 6000;
        let maxAltitude = 0;

        let removedPhrases = [];

        /* find altitude numbers */
        searchPhrases.forEach(el => {
            if ($.isNumeric(el)) {
                removedPhrases.push(el);
                numbersCount -= - 1;
                minAltitude > el ? minAltitude = el : "";
                maxAltitude < el ? maxAltitude = el : "";
            }
        });

        /* remove numbers from searchPhrases */
        removedPhrases.forEach(element => {
            searchPhrases = jQuery.grep(searchPhrases, function (value) {
                return value != element;
            });
        });

        /* throws errors */
        if (minAltitude < 0) {
            errorToast("Error", "Minimum altitude allowed is 0");
            return;
        } else if (maxAltitude > 6000) {
            errorToast("Error", "Maximum altitude allovved is 6000");
            return;
        } else if (searchPhrases.length == 1 && searchPhrases[0] == "") {
            errorToast("No input", "Please type in values before clicking the search button");
            return;
        } else if (numbersCount > 2) {
            errorToast("Too many numbers", "Please type either one number or two. Alternatively you can use advanced search");
            return;
        }

        if (numbersCount > 1) {
            //console.log("finding mounstains with min: "+minAltitude+"m, max: "+maxAltitude+"m");
            loadJSON(URL_MIN_MAX_HEIGHT.replace(":min", minAltitude).replace(":max", maxAltitude), convertData);
        } else if (numbersCount == 1) {
            //console.log("finding mountains where alt >= "+minAltitude+"m");
            loadJSON(URL_MIN_HEIGHT.replace(":altitude", minAltitude), convertData);
        }
        searchPhrases.forEach(phrase => {
            //console.log("searching for name: " + phrase);
            loadJSON(URL_NAME.replace(":name", phrase), convertData);
        });
    } else {
        let iterator = selectedOptions.entries();
        let minAndMax = false;
        let option = iterator.next();
        while (!option.done) {
            switch (option.value[0]) {
                case "name":
                    let phrase = $(option.value[1].getElementsByTagName("input")).val().trim();
                    //console.log("searching for full name: "+ phrase);
                    loadJSON(URL_NAME.replace(":name", phrase), convertData);
                    break;
                case "height":
                    let height = $(option.value[1].getElementsByTagName("input")).val().trim();
                    //console.log("searching for height +/- 25%: "+ height);
                    loadJSON(URL_MIN_MAX_HEIGHT.replace(":min", height * 0.75).replace(":max", height * 1.25), convertData);
                    break;
                case "min-height":
                    if (selectedOptions.has("max-height")) {
                        minAndMax = true;
                    } else {
                        let minAltitude = $(option.value[1].getElementsByTagName("input")).val().trim();
                        //console.log("finding mountains where alt >= "+minAltitude+"m");
                        loadJSON(URL_MIN_HEIGHT.replace(":altitude", minAltitude), convertData);
                    }
                    break;
                case "max-height":
                    if (selectedOptions.has("min-height")) {
                        minAndMax = true;
                    } else {
                        let maxAltitude = $(option.value[1].getElementsByTagName("input")).val().trim();
                        //console.log("finding mountains where alt < "+maxAltitude+"m");
                        loadJSON(URL_MIN_MAX_HEIGHT.replace(":max", maxAltitude).replace(":min", 0), convertData);
                    }
                    break;
            }
            option = iterator.next();
        }
        if (minAndMax) {
            let minAltitude = $(selectedOptions.get("min-height").getElementsByTagName("input")).val().trim();
            let maxAltitude = $(selectedOptions.get("max-height").getElementsByTagName("input")).val().trim();
            loadJSON(URL_MIN_MAX_HEIGHT.replace(":min", minAltitude).replace(":max", maxAltitude), convertData);
        }
    }
}

function forwardToSite() {
    console.log(result);

    /*  all the mountains from search result 
    *   are in map result
    */

    //deletes previous results
    let resContainer = document.getElementById("results");
    resContainer.innerHTML = "";
    
    var stev = 0;
    result.forEach(element => {
        var el = makeResultItem(element);
        el.setAttribute("data-index", stev);
        el.addEventListener("click" , details);
        stev++;
        resContainer.appendChild(el);
    });



    //tmp solution only for testing
    //result = new Map();
}

function convertData(data, callback) {
    result = new Map();
    /* save all mountains from search to result map */
    data.forEach(element => {
        result.set(element.name, element);
    });
    numberOfWaitingResults--;
    if (numberOfWaitingResults == 0) {
        callback();
    }
}

// opens details page
function details(){
    var id =  event.currentTarget.getAttribute("data-index");
    console.log(Array.from(result)[id][1]);
    localStorage.setItem("details",JSON.stringify(Array.from(result)[id][1]));
    location.pathname = "/website/details.html";
}

function loadJSON(path, success, error) {
    numberOfWaitingResults++;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText), forwardToSite);
            } else {
                if (error)
                    console.log(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function randomId() {
    //TODO
    window.location.href = "#";
    return true;
}

/* Show error/warning toast */
function errorToast(title, text) {
    $('.toast-text-primary').html(title.toUpperCase());
    $('.toast-body').html(text);
    $('.toast').toast({ delay: 5000 });
    $('.toast').toast('show');
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


function makeResultItem(params) {
    var element = params;
    var div = document.createElement(div);
    div.classList.add("result-item");

    //title
    div.innerHTML = "<h4 class='result-item-heading'>" + element.name + "</h4>";


    //location 
    var location = document.createElement("i");
    location.classList.add("material-icons", "result-item-icon");
    location.innerHTML = "my_location";
    let locText = document.createElement("p");
    locText.innerText = "Lon: " + element.coordinates.N + "  Lat: " + element.coordinates.E;
    locText.classList.add("result-item-text");

    //country
    var country = document.createElement("i");
    country.classList.add("material-icons", "result-item-icon");
    country.innerHTML = "outlined_flag";
    let countryText = document.createElement("p");
    countryText.innerText = element.country;
    countryText.classList.add("result-item-text");

    //range
    var range = document.createElement("i");
    range.classList.add("material-icons", "result-item-icon");
    range.innerHTML = "terrain";
    let rangeText = document.createElement("p");
    rangeText.innerText = element.mountainRange;
    rangeText.classList.add("result-item-text");


    //altitude
    var alt = document.createElement("i");
    alt.classList.add("material-icons", "result-item-icon");
    alt.innerHTML = "arrow_upward";
    let altText = document.createElement("p");
    altText.innerText = element.altitude + "m";
    altText.classList.add("result-item-text");


    //path count
    var path = document.createElement("i");
    path.classList.add("material-icons", "result-item-icon");
    path.innerHTML = "trending_up";
    let pathText = document.createElement("p");
    pathText.innerText = element.paths.length;
    pathText.classList.add("result-item-text");


    //image
    var wrapper = document.createElement("div");
    var image = document.createElement("div");
    wrapper.classList.add("result-item-wrapper");
    image.classList.add("result-item-image");

    var dataWrapper = document.createElement("div");
    dataWrapper.classList.add("result-item-data");

    wrapper.appendChild(image);
    dataWrapper.appendChild(location);
    dataWrapper.appendChild(locText);
    dataWrapper.appendChild(country);
    dataWrapper.appendChild(countryText);
    dataWrapper.appendChild(range);
    dataWrapper.appendChild(rangeText);
    dataWrapper.appendChild(alt);
    dataWrapper.appendChild(altText);
    dataWrapper.appendChild(path);
    dataWrapper.appendChild(pathText);

    wrapper.appendChild(dataWrapper);
    div.appendChild(wrapper);
    return div;
}
