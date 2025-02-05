const express = require('express');
const router = express.Router();

const prophetsController = require('../controllers/prophets');

router.get('/', prophetsController.getAll);
router.get('/:id', prophetsController.getSingle);

module.exports = router;
  