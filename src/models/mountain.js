'use strict';

const mongoose = require('mongoose');

const mountainSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true
    },
    country: {
        type: String,
        trim: true,
    },
    mountainRange: {
        type: String,
        trim: true,
    },
    altitude: {
        type: Number,
        trim: true
    },
    coordinates: {
        N: {
            type: String,
            trim: true
        },
        E: {
            type: String,
            trim: true
        }
    },
    paths: [{
        type: String,
        trim: true,
        unique: true
    }]
});

// create model for mountain
const Mountain = mongoose.model('Mountain', mountainSchema);

module.exports = Mountain;