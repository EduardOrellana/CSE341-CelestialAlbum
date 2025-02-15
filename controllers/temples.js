const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('temples').find();
    result.toArray().then((temples) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(temples);
    });
};

const getSingle = async (req, res) => {
    const userID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('temples').find({ _id: userID });
    result.toArray().then((temples) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(temples[0]);
    });
}

const createTemples = async (req, res) => {
    const temple = {
        NameOfTemple: req.body.NameOfTemple ,
        CityLocation: req.body.CityLocation,
        StateRegionTerritory: req.body.StateRegionTerritory,    
        Country: req.body.Country,     
        dateOfAnnouncment: req.body.dateOfAnnouncment,                        
        whoDedicated: req.body.whoDedicated,
        DateOfDedication: req.body.DateOfDedication
    };
    const result = await mongodb.getDatabase().db().collection('temples').insertOne(temple);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create temples');
    }
};

const updateTemples = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const temple = {
        NameOfTemple: req.body.NameOfTemple ,
        CityLocation: req.body.CityLocation,
        StateRegionTerritory: req.body.StateRegionTerritory,    
        Country: req.body.Country,     
        dateOfAnnouncment: req.body.dateOfAnnouncment,                        
        whoDedicated: req.body.whoDedicated,
        DateOfDedication: req.body.DateOfDedication
    };
    const result = await mongodb.getDatabase().db().collection('temples').replaceOne({ _id: userId }, temple);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update temple');
    }
};

const deleteTemples = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('temples').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete temples');
    }
};


module.exports = {
    getAll,
    getSingle,
    createTemples,
    updateTemples,
    deleteTemples
};














// NameOfTemple
// "Feather River"
// CityLocation
// "Yuba City"
// StateRegionTerritory
// "California"
// Country

