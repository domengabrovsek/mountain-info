## Description



## Prerequisites

- NodeJs (<https://nodejs.org/en/>)
- Docker (<https://www.docker.com/>)

## Get started

```
// clone repo
~ git clone https://github.com/domengabrovsek/mountain-info.git

// install dependencies
~ npm install 

// setup database
~ npm run setup-db 

// run app
~ node index.js
```

## Endpoints

- [GET] http://localhost:3000/scrape // run this to populate database with initial data - will later be replaced with prepopulated docker image

- [GET] http://localhost:3000/mountain/:id // run this to get mountain data. ID is mountain id

- [GET] http://localhost:3000/weather/lat=:lat&lon=:lon //run this to get weather data for specific location (lat, lon)

- [GET] http://localhost:3000/weather/name=:name //run this to get weather data by city name