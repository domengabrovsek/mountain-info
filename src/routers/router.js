'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../helpers/parser');
const { saveToDb, getById } = require('../db/db-helpers');
const { fetchOpenDataByLatLon, fetchOpenWeatherByName } = require('../helpers/weatherAPI');
const { check, validationResult } = require('express-validator');

// test endpoint
router.get('/test', async(req, res) => {
    res.send({ data: 'Server is working!'});
})

// endpoint to scrape data from hribi.net (this is used at start to populate database, it's a temporary solution, later it will be replaced with prepopulated db docker image)
router.get('/scrape', async(req, res) => {

    console.log('Starting scraper...');

    try {
        
        const numberOfMountains = 20; // 3034 is the total number of all mountains but 20 is enough data to test stuff
        const baseUrl = 'http://hribi.net';

        // fetch data for all mountains
        for(let i = 1; i <= numberOfMountains; i++) {

            try {
            
                // check if mountain already exists in database before fetching it
                const mountain = await getById(i);

                // mountain exists
                if(mountain) {
                    console.log(`${mountain.name} (${i}) already exists in database, no need to fetch it!`);
                    continue;
                }

                const options = {
                    uri: `${baseUrl}/gora/whatever/1/${i}`,
                    transform: function (body) { return cheerio.load(body); }
                };

                await rp(options).then(async($) => {
                    const data = parse($, i);
                    await saveToDb(data, i);
                })
            } catch (error) {
                if(error.statusCode === 500) {
                    console.log(`Website for ${error.options.uri} doesn't exist!`);
                }        
            }
        }

        res.send({ status: 'Success!' });
    } catch (error) {
        res.status(400).send({ error: `An error has occured!`});        
    }
});

// endpoint to get data for specific mountain, find mountain data via ID. Method only allow numbers(int) as get parameter
router.get('/mountain/:id(\\d+)/', async (req, res) => {
    var id = req.params.id;

    try {

        const mountain = await getById(id);

        if(mountain) {
            res.send(mountain);
        } else {
            res.status(400).send({ error: `Cannot get mountain data for ID ${id}!`});
        }

        
    } catch(error) {
        res.status(400).send({ error: `Cannot get mountain data for ID ${id}!`})
    }
});

// endpoint for fetching weather data by coordinates (lat and lon)
router.get('/weather/lat=:lat&lon=:lon', [
    check('lat').isDecimal(),
    check('lon').isDecimal()
  ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const lat = req.params.lat;
    const lon = req.params.lon;

    try {
        // weather API call
        const data = await fetchOpenDataByLatLon(lat,lon).catch(err => {
            res.send({message: `Error occured: ${err}`});
        });

        if(data) {
            res.send(data);
        } else {
            res.status(200).send({message: `Result is empty`});
        }
        
    } catch(error) {
        res.status(400).send({error: `Cannot get weather data for lat: ${lat} and lon: ${lon}`});
    }
    
});

// endpoint for fetching weather data by name
router.get("/weather/name=:name", [
        check('name').not().isEmpty()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const name = req.params.name;

    try {
        // weather API call
        const data = await fetchOpenWeatherByName(name).catch(err => {
            res.send({message: `Error occured: ${err}`})
        });

        if(data) {
            res.send(data);
        } else {
            res.status(200).send({message: `Result is empty`});
        }
        
    } catch(error) {
        res.status(400).send({error: `Cannot get weather data for name: ${name}`});
    }
});

module.exports = router;