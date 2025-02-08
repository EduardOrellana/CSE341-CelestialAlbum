const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.use('/api-docs',
    require('./swagger')
);

router.use('/chapels',
    require('./chapels')
);

router.use('/prophets',
    require('./prophets')
);



module.exports = router;