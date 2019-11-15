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

// helpers

const split = (input) => input && input.split(': ')[1];

module.exports = {
    parse
}