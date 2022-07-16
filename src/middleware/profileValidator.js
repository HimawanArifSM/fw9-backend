const {body} = require('express-validator');

const profileValidator = [
  body('fullname').isLength({min: 4}).withMessage('Fullname length minimal 4 character').optional({nullable:true}),
  body('phonenumber').isMobilePhone('id-ID').withMessage('Phone number format is incorect').optional({nullable:true})
];

module.exports = profileValidator;