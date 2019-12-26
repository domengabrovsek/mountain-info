'use strict';

let searchBox;
let searchButton;
let searchInputAll;
let options;
let toggleAdvencedOptions;
let sidenavButton;

/* Default */
const SEARCHBOX_HEIGHT = '44px';

/* Advanced search options */
let nameOpt;
let heightOpt;
let minHeightOpt;
let maxHeightOpt;
let rangeOpt;
let countryOpt;

let selectedOptions = [];

function init(params) {
    console.log("init");
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
    rangeOpt = document.getElementById("mountain-range");
    countryOpt = document.getElementById("country");

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
    console.log("toggle options");
    $(options).slideToggle(400);
}

function clickOnOption(option) {
    let displayMode;
    /* Firstly check if you want to remove or add clicked option */
    if (selectedOptions.includes(option.parentElement)) {
        let index = selectedOptions.indexOf(option.parentElement);
        /* Remove option from array */
        selectedOptions.splice(index, 1);
        /* Move option back to options-container */
        options.appendChild(option.parentElement);
        displayMode = "none";
    } else {
        displayMode = "block";
        /* Add option to array */
        selectedOptions.push(option.parentElement);
        /* Hide universal search input */
        searchInputAll.style.visibility = "hidden";
        /* Move option to search bar */
        searchBox.appendChild(option.parentElement);
    }
    /* If no options are selected shoe universal input */
    if (selectedOptions.length == 0) {
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
    if (selectedOptions.length == 0) {
        searchInputAll.style.visibility = "visible";
        document.documentElement.style.setProperty('--searchbox-height', SEARCHBOX_HEIGHT);
    } else {
        /* Make it bigger than default */
        checkSearchBoxSize();
    }
}

function checkSearchBoxSize(params) {
    console.log($(searchBox).height());
    document.documentElement.style.setProperty('--searchbox-height', $(searchBox).height()+"px");
}

function getData(params) {
    /* Check if no options are selected */
    if (selectedOptions.length == 0) {
        let searchPhrases = $(searchInputAll).val().trim().split(/\s+/);
        let numbersCount = 0;
        let minAltitude = 6000;
        let maxAltitude = 0;

        /* find altitude numbers */
        searchPhrases.forEach(el => {
            if ($.isNumeric(el)) {
                numbersCount -=- 1;
                minAltitude > el ? minAltitude = el : "";
                maxAltitude < el ? maxAltitude = el : "";
            }
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
            console.log("finding mounstains with min: "+minAltitude+"m, max: "+maxAltitude+"m");
            window.location.href = 'http://localhost:3000/mountain/min/'+minAltitude+'/max/'+maxAltitude;
        } else if (numbersCount == 1) {
            console.log("finding mountains where alt >= "+minAltitude+"m");
            window.location.href='http://localhost:3000/mountain/altitude/'+minAltitude;
        }
        console.log(searchPhrases);
    } else {
        selectedOptions.forEach(element => {
            
        });
    }

    
}

function randomId() {
    //TODO
    window.location.href="#";
    return true;
}

/* Show error/warning toast */
function errorToast(title, text) {
    $('.toast-text-primary').html(title.toUpperCase());
    $('.toast-body').html(text);
    $('.toast').toast({delay: 5000});
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
    } else  {
        //sidebarWidth.style.width = "";
        $(sidebarWidth).animate(
            { width: '-=240px' }, { duration: 200, queue: false }
        );
        $(sidenavButton).animate(
            { left: '-=240px' }, { duration: 200, queue: false }
        );
    }  
}
  