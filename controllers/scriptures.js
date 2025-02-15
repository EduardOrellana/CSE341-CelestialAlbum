const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('scriptures').find();
    result.toArray().then((scriptures) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(scriptures);
    });
};

const getSingle = async (req, res) => {
    const userID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('scriptures').find({ _id: userID });
    result.toArray().then((scriptures) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(scriptures[0]);
    });
}

const createScriptures = async (req, res) => {
    const scripture = {
        BookOfScripture: req.body.BookOfScripture,
        NameOfBook: req.body.NameOfBook,
        Chapter: req.body.Chapter,
        Verse: req.body.Verse
        
    };
    const result = await mongodb.getDatabase().db().collection('scriptures').insertOne(scripture);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create scriptures');
    }
};

const updateScriptures = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const scripture = {
        BookOfScripture: req.body.BookOfScripture,
        NameOfBook: req.body.NameOfBook,
        Chapter: req.body.Chapter,
        Verse: req.body.Verse
    };
    const result = await mongodb.getDatabase().db().collection('scriptures').replaceOne({ _id: userId }, scripture);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update scripture');
    }
};

const deleteScriptures = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('scriptures').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete scripture');
    }
};


module.exports = {
    getAll,
    getSingle,
    createScriptures,
    updateScriptures,
    deleteScriptures
};

