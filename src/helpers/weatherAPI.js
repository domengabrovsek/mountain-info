'use strict';

const { fetchJSON }  = require('./fetch');

const WEATHER_API_KEY = "37783e3aee7050d7c1e9441f395f41bd";

const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather?";

const OPEN_DATA_SLO = "https://opendata.si/vreme/report/?";


/* Open weather map API */
const fetchOpenWeatherByLatLon = async (lat, lon) => {
    const data = await fetchJSON(`${OPEN_WEATHER_MAP_URL}lat=${lat}&lon=${lon}&&units=metric&APPID=${WEATHER_API_KEY}`, 'GET')
    .catch(err => {
        throw Error(err);
    });
    return data;
}

const fetchOpenWeatherByName = async (name) => {
    const data = await fetchJSON(`${OPEN_WEATHER_MAP_URL}q=${name}&&units=metric&APPID=${WEATHER_API_KEY}`, 'GET')
    .catch(err => {
        throw Error(err); 
    });
    return data;
}

/* OPEN weather data API - slo */
const fetchOpenDataByLatLon = async (lat, lon) => {
    const data = await fetchJSON(`${OPEN_DATA_SLO}lat=${lat}&lon=${lon}`, 'GET')
    .catch(err => {
        throw Error(err); 
    });
    return data;
}

module.exports = {
    WEATHER_API_KEY,
    fetchOpenWeatherByLatLon,
    fetchOpenWeatherByName,
    fetchOpenDataByLatLon
};