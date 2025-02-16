const express = require('express');
const router = express.Router();
const chapelsController = require('../controllers/chapels');
const { isAuthenticated } = require('../middleware/authenticate');
const { validateChapel } = require('../middleware/validator');

function handleError(res, error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error", error: error.message });
}

router.get('/', async (req, res) => {
  try {
    await chapelsController.getAll(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await chapelsController.getSingle(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/', isAuthenticated, validateChapel, async (req, res) => {
  try {
    await chapelsController.createChapels(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.put('/:id', isAuthenticated, validateChapel, async (req, res) => {
  try {
    await chapelsController.updateChapels(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await chapelsController.deleteChapels(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
