const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');
const {isAuthenticated} = require('../middleware/authenticate');

function handleError(res, error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
}

router.get('/', async (req, res) => {
    try {
        await templesController.getAll(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await templesController.getSingle(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    try {
        await templesController.createTemples(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        await templesController.updateTemples(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await templesController.deleteTemples(req, res);
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
