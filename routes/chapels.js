const express = require('express');
const router = express.Router();
const chapelsController = require('../controllers/chapels');


router.get('/', chapelsController.getAll);
router.get('/:id', chapelsController.getSingle);

module.exports = router;
