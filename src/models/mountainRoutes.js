'use strict';

const mongoose = require('mongoose');


const mountainRoutesScheme = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true
    },
    startName: {
        type: String,
        trim: true
    },
    startCoordinates: {
        N: {
            type: String,
            trim: true
        },
        E: {
            type: String,
            trim: true
        }
    },
    time: {
        type: String
    },
    endName: {
        type: String,
        trim: true
    },
    endCoordinates: {
        N: {
            type: String,
            trim: true
        },
        E: {
            type: String,
            trim: true
        }
    },
    difficultLevel: {
        type: String,
        trim: true
    },
    altitudeDifference: {
        type: String,
        trim: true
    }
    // should we add this???
    /*recommendedEquipment: {
        type: String
    }*/
});

// create model for mountain routes
const MountainRoutes = mongoose.model('MountainRoutes', mountainRoutesScheme);

module.exports = MountainRoutes;