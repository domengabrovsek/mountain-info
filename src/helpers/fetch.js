'use strict';

const fetch = require('node-fetch');


let basicHeader = {
    "Content-Type": "application/json"
};


const logResult = (result) => {
    console.log(result);
}

const logError = (error) => {
    console.log('Looks like there was a problem: \n', error);
}

const validateResponse = (response) => {
    if (!response.ok) {
        console.log("Error: ", response);
        return response;
    }
    return response;
}

const readResponseAsJSON = (response) => {
    return response.json();
}

const fetchJSON = (pathToResource, method) => {
    return fetch(pathToResource, {
        method: method,
        headers: basicHeader,
    }) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(result => {
        return result;
    }) // 4
    .catch(logError);
}

module.exports = { 
    fetchJSON
};