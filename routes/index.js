const passport = require('passport');

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

router.get('login', passport.authenticate, (req, res) => {});

router.get('logout', (req, res, next) => {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');     
    });
});

module.exports = router;