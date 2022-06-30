const profiles=require('express').Router();

const profileController = require('../controllers/profiles');

const { body } =require('express-validator');

const createProfileValidator = [
  body('fullname').isLength({min: 4}).withMessage('Fullname length minimal 4 character')
];

profiles.get('/', profileController.getAllProfiles);
profiles.post('/', ...createProfileValidator,profileController.createProfiles);
profiles.patch('/:id', ...createProfileValidator,profileController.updateProfiles);
profiles.delete('/:id', profileController.deleteProfiles);
profiles.get('/:id', profileController.getDetailProfiles);

module.exports= profiles;