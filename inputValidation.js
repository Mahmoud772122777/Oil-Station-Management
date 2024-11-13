const { body, validationResult } = require('express-validator');

const validateUser = [
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .isAlphanumeric()
        .withMessage('Username must be alphanumeric'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUser, validate };
