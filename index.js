'use strict';

const express = require('express');
const router = require('./src/routers/router');

// start the connection to the mongodb 
require('./src/db/mongoose'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));


// const fs = require('fs');

// const {getData} = require('./src/functions');

// getData();
// let data = {};
// let folder = "\\files";

// (async function(){
//   var fileContents = await fs.promises.readFile(FILENAME)
//   var data = JSON.parse(fileContents)
// })()