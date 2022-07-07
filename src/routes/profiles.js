const profiles=require('express').Router();

const profileController = require('../controllers/profiles');

const rules = require('../middleware/profileValidator');

const validation = require('../middleware/validation');

const uploadFile = require('../middleware/uploadFile');

profiles.get('/', profileController.getAllProfiles);
profiles.post('/', uploadFile,...rules, validation, profileController.createProfiles);
profiles.patch('/:id', uploadFile,...rules, validation, profileController.updateProfiles);
profiles.delete('/:id', profileController.deleteProfiles);
profiles.get('/:id', profileController.getDetailProfiles);

module.exports= profiles;