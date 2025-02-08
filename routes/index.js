const router = require('express').Router();


router.get('/', (req, res) => { res.send('Hello World!') });

router.use('/chapels', require('./chapels'));
router.use('/prophets', require('./prophets'));



module.exports = router;