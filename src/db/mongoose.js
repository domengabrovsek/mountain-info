'use strict';

const mongoose = require('mongoose');
const dbName = 'mountain-info';
const port = '27017';

mongoose.connect(`mongodb://127.0.0.1:${port}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true, //autocreate indexes when working with mongoDB
    useUnifiedTopology: true
});