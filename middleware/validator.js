const { body, check, validationResult } = require('express-validator');

const validateChapel = [
    check('cityChapel').isString().isLength({ min: 3 }).notEmpty(),
    check('stateTerritory').isString().isLength({ min: 3 }).notEmpty,
    check('streetName').isString().isLength({ min: 3 }).notEmpty(),
    check('zipCode').isPostalCode().isLength({ min: 3 }).notEmpty(), ,

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateProphet = [
    check('firstName').isString().isLength({ min: 3 }).notEmpty(),
    check('lastName').isString().isLength({ min: 3 }).notEmpty(),
    check('DateOfBirth').isDate().withMessage('Invalid DateOfBirth'),
    check('DateOfDeath').isDate().optional().withMessage('Invalid DateOfDeath'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateScritpure = [
    check('BookOfScritpure').isString().isLength({ min: 3 }).notEmpty(),
    check('NameOfBook').isNumeric().isLength({ min: 1 }).notEmpty(),
    check('Chapter').isNumeric().isLength({ min: 1 }).notEmpty(),
    check('Verse').isString().isLength({ min: 3 }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateTemple = [
    check('NameOfTemple').isString().isLength({ min: 3 }).notEmpty(),
    check('CityLocation').isString().isLength({ min: 3 }).notEmpty(),
    check('StateRegionTerritory').isString().optional().isLength({ min: 3 }),
    check('Country').isString().isLength({ min: 3 }).notEmpty(),
    check('dateOfAnnouncment').isDate(),
    check('whoDedicated').isString().isLength({ min: 3 }),
    check('DateOfDedication').isDate().optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    validateChapel,
    validateProphet,
    validateScritpure,
    validateTemple
}