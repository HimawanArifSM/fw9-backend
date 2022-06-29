const profiles=require('express').Router();

const profileController = require('../controllers/profiles');

profiles.get('/', profileController.getAllProfiles);
profiles.post('/', profileController.createProfiles);
profiles.patch('/:id', profileController.updateProfiles);
profiles.delete('/:id', profileController.deleteProfiles);
profiles.get('/:id', profileController.getDetailProfiles);

module.exports= profiles;