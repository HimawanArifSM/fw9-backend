const userModel = require('../models/users');
const response = require('../helpers/standardRespons');
const errorResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const qtModels = require('../models/queryTransaction');


// exports.register=(req, res)=>{
//   req.body.pin = null;
//   userModel.createUsers(req.body, (err)=>{
//     if(err){
//       return errorResponse(err, res);
//     }else{
//       return response(res, 'Create user succesfully');
//     }  
//   });
// };

exports.register=(req, res)=>{
  //req.body.pin = null;
  qtModels.register(req.body, (err)=>{
    if(err){
      return errorResponse(err,res);
    }
    else{
      return response(res, 'Create user succesfully');
    }
  });
};

exports.createPin= (req, res)=>{
  const {email}= req.body;
  userModel.getUserByEmail(email, (err, results)=>{
    if(results.rows.length >0){
      const user= results.rows[0];
      if(user.pin === null){
        userModel.updateUsers(user.id, {pin:req.body.pin}, (err, resultUpdate)=>{
          const userUpdated = resultUpdate.rows[0];
          if(userUpdated.email === user.email){
            return response(res, 'Create pin successfully');
          }
        });
      }
      else{
        return response(res, 'Error: PIN already set', null, null, 400);
      }
    }
    else{return response(res, 'Error: Failed to create PIN', null, null, 400);
    }
  });
};

exports.login=(req, res)=>{
  const {email, password}=req.body;
  userModel.getUserByEmail(email, (err, results)=>{
    if(results.rows.length <1){
      return response(res,'User not found', null, null, 400);
    }
    const user = results.rows[0];
    bcrypt.compare(password, user.password)
      .then((cpRes)=>{
        if(cpRes){
          const token = jwt.sign({id: user.id}, process.env.APP_SECRET);
          return response(res, 'Login success', {token});
        }else{
          return response(res, 'Email or password doesnt match', null, null, 400);
        }
      })
      .catch(e =>{
        return response(res, 'Email or password doesnt match', null, null, 404);
      });
  });
};