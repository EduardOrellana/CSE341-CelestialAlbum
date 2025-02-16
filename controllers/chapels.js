const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('chapels').find();
    result.toArray().then((chapels) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(chapels);
    });
};

const getSingle = async (req, res) => {
    const userID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('chapels').find({ _id: userID });
    result.toArray().then((chapels) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(chapels[0]);
    });
};

const createChapels = async (req, res) => {
    const chapel = {
        cityChapel: req.body.cityChapel,
        stateTerritory: req.body.stateTerritory,
        streetName: req.body.streetName,
        zipCode: req.body.zipCode
    };
    const result = await mongodb.getDatabase().db().collection('chapels').insertOne(chapel);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create chapels');
    }
};

const updateChapels = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const chapel = {
        cityChapel: req.body.cityChapel,
        stateTerritory: req.body.stateTerritory,
        streetName: req.body.streetName,
        zipCode: req.body.zipCode
    };
    const result = await mongodb.getDatabase().db().collection('chapels').replaceOne({ _id: userId }, chapel);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update chapels');
    }
};

const deleteChapels = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('chapels').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete chapels');
    }
};

module.exports = {
    getAll,
    getSingle,
    createChapels,
    updateChapels,
    deleteChapels
};
