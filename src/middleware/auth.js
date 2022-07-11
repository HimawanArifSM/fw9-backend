const response = require('../helpers/standardRespons');
const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
  if(req.headers.authorization){
    const auth = req.headers.authorization;
    const prefix = 'Bearer';
    if(auth.startsWith(prefix)){
      const token = auth.slice(prefix.length+1, auth.length);
      try{
        const results = jwt.verify(token, process.env.APP_SECRET);
        req.authUser= results;
        next();
      }catch(e){
        return response(res, 'Token expired', null, null, 400);
      }
    }
  }
  else{return response(res, 'Unautorized', null, null, 401);}
};

module.exports = auth;