const body = require('express-validator');

const profileValidator = [
  body('fullname').isLength({min: 4}).withMessage('Fullname length minimal 4 character'),
  body('phonenumber').isMobilePhone('id-ID').withMessage('Phone number format is incorect')
];

module.exports = profileValidator;