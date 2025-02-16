const express = require('express');
const router = express.Router();
const scripturesController = require('../controllers/scriptures');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateScritpure } = require('../middleware/validator');

function handleError(res, error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
}

router.get('/', async (req, res) => {
    try {
        await scripturesController.getAll(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await scripturesController.getSingle(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', isAuthenticated, validateScritpure, async (req, res) => {
    try {
        await scripturesController.createScriptures(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', isAuthenticated, validateScritpure, async (req, res) => {
    try {
        await scripturesController.updateScriptures(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await scripturesController.deleteScriptures(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
