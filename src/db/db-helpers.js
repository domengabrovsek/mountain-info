'use strict';

const Mountain = require('../models/mountain');
const MountainRoutes = require('../models/mountainRoutes');

const saveToDb = async(object, i) => {
    const result = new Mountain(object);

    try {
        console.log(`Saving ${object.name} (${i})`);
        await result.save();
        console.log(`${object.name} saved to database.\n`);
    } catch (error) {
        // duplicate key in database
        if(error.code === 11000) {
            console.log(`Record with name ${object.name} already exists in database!`);
        } else {
            console.log(`Error: ${error} for object ${object.name}`);
        }
    }
};

const saveRoutesToDB = async(object, i) => {
    const result = new MountainRoutes(object);

    try {
        console.log(`Saving ${object.name} (${i})`);

        await result.save();
        console.log(`${object.name} save to database.\n`);
    } catch(error) {
        // duplicate key in database
        if(error.code === 11000) {
            console.log(`Record with name ${object.name} already exists in database!`);
        } else {
            console.log(`Error: ${error} for object ${object.name}`);
        }
    }
};

const getById = async(id) => {
    try {
        const result = await Mountain.find({ id: id });
        return result[0];

    } catch (error) {
        console.log(`Error while fetching ${id} from database!`);
    }
}

const getAllMountains = async() => {
    try {
        const result = await Mountain.find({});
        return result;
    } catch(error) {
        console.log(`Error while fetching mountains data: ${error}`);
    }
}

const getMountainsByAltitude = async(altitude) => {
    try {
        const result = await Mountain.find({altitude: { $gt: altitude} });
        return result;
    } catch(error) {
        console.log(`Error while fetching mountains data: ${error}`);
    }
}

const getMountainsByAltitudeRange = async(range) => {
    try {
        const result = await Mountain.find({ 
            $and: [
                {altitude: { $gt: range.min }}, 
                {altitude: { $lt: range.max }}
            ]
        });
        return result;
    } catch(error) {
        console.log(`Error while fetching mountains data: ${error}`);
    }
}

const getRoutesByID = async(id) => {
    try {
        const result = await MountainRoutes.find({ id: id });
        return result;
    } catch(error) {
        console.log(`Error while fetching routes data: ${error}`);
    }
}

const getAllRoutes = async() => {
    try {
        const result = await MountainRoutes.find({});
        return result;
    } catch(error) {
        console.log(`Error while fetching routes data: ${error}`);
    }
}

module.exports = {
    saveToDb,
    getById,
    getAllMountains,
    getMountainsByAltitude,
    getMountainsByAltitudeRange,
    saveRoutesToDB,
    getRoutesByID,
    getAllRoutes
};