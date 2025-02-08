const express = require('express');
const router = express.Router();

const prophetsController = require('../controllers/prophets');

function handleError(res, error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
}

router.get('/', async (req, res) => {
    //#swagger.tags = ['Get All Prophets']
    try {
        await prophetsController.getAll(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', async (req, res) => {
    //#swagger.tags = ['Get one Prophet by ID']
    try {
        await prophetsController.getSingle(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', async (req, res) => {
    //#swagger.tags = ['Post New Prophet']
    try {
        await prophetsController.createProphets(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', async (req, res) => {
    //#swagger.tags = ['Update Prophet']
    try {
        await prophetsController.updateProphets(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', async (req, res) => {
    //#swagger.tags = ['Delete one Prophet']
    try {
        await prophetsController.deleteProphets(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
