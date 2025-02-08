const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('prophets').find();
    result.toArray().then((prophets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(prophets);
    });
};

const getSingle = async (req, res) => {
    const userID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('prophets').find({ _id: userID });
    result.toArray().then((prophets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(prophets[0]);
    });
}

const createProphets = async (req, res) => {
    const prophet = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DateOfBirth: req.body.DateOfBirth,
        DateOfDeath: req.body.DateOfDeath,
    };
    const result = await mongodb.getDatabase().db().collection('prophets').insertOne(prophet);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create prophet');
    }
};

const updateProphets = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const prophet = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DateOfBirth: req.body.DateOfBirth,
        DateOfDeath: req.body.DateOfDeath,
    };
    const result = await mongodb.getDatabase().db().collection('prophets').replaceOne({ _id: userId }, prophet);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update prophet');
    }
};

const deleteProphets = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('prophets').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete prophet');
    }
};


module.exports = {
    getAll,
    getSingle,
    createProphets,
    updateProphets,
    deleteProphets
};

