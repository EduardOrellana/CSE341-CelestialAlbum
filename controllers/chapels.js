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
    const result = await mongodb.getDatabase().db().collection('chapels').find({_id: userID});
        result.toArray().then((chapels) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(chapels[0]);
       });
};

module.exports = {
    getAll,
    getSingle
};
