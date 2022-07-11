const profilesModel = require('../models/profiles');
const response = require('../helpers/standardRespons');
// const errorResponse = require('../helpers/errorResponse');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


exports.profile = (req, res)=>{
  const {id}=req.authUser.id;
  profilesModel.getDetailProfiles(id, (results)=>{
    if(results.rows.length > 0){
      return response(res, 'Detail profiles', results.rows[0]);
    }
    else{return res.redirect('/404');
    }
  });
};