const router = require('express').Router();


router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World!')
});

router.use('/chapels', require('./chapels'));
router.use('/prophets', require('./prophets'));



module.exports = router;