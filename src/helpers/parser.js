'use strict';

const parse = ($, id) => {

    // parse relevant mountain data from page
    const mountainData = $('#vsebina td').text().trim().split('\n').filter(x => x).slice(0, 5).map(x => x.trim());

    // parse urls for all paths for specific mountain
    const pathUrls = Array.from(new Set($('#vsebina').html().match(/\/izlet\/[^"\\\>]*/g))).map(x => `http://hribi.net${x}`);

    // parse coordinates
    const coordinates = mountainData[4].split(':')[1].trim().split('/').map(x => x.replace(/°[N|E]{1}/, '').trim());

    // construct mountain object
    const mountain = {
        id: id,
        name: mountainData[0],
        country: split(mountainData[1]),
        mountainRange: split(mountainData[2]),
        altitude: split(mountainData[3]).replace('m', '').trim(),
        coordinates: {
            N: coordinates[0],
            E: coordinates[1]
        },
        paths: pathUrls
    };

    return mountain;

};


const parseRoutes = ($, id) => {
    // parse relevant mountain data from page
    const mountainRoutesData = $('#vsebina td').text().trim().split('\n').filter(x => x).slice(0, 10).map(x => x.trim());


    // parse start coordinates
    const coordinates = mountainRoutesData[3].split(':')[1].trim().split('/').map(x => x.replace(/°[N|E]{1}/, '').trim());


    const moutainRoutes = {
        id: id,
        name: mountainRoutesData[0],
        startName: split(mountainRoutesData[2]),
        endName: split(mountainRoutesData[4]),
        startCoordinates: {
            N: coordinates[0],
            E: coordinates[1]
        },
        time: split(mountainRoutesData[6]),
        difficultLevel: split(mountainRoutesData[7]),
        altitudeDifference: split(mountainRoutesData[9])
    };
    return moutainRoutes;
}

// helpers

const split = (input) => input && input.split(': ')[1];

module.exports = {
    parse,
    parseRoutes
}