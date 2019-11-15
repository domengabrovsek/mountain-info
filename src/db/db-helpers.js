'use strict';

const Mountain = require('../models/mountain');

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

const getById = async(id) => {
    try {
        const result = await Mountain.find({ id: id });

        return result[0];

    } catch (error) {
        console.log(`Error while fetching ${id} from database!`);
    }
}

module.exports = {
    saveToDb,
    getById
};