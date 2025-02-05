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
    const result = await mongodb.getDatabase().db().collection('prophets').find({_id: userID});
        result.toArray().then((prophets) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(prophets[0]);
       });
}



module.exports = {
    getAll,
    getSingle
};

