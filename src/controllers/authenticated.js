const profilesModel = require('../models/profiles');
const response = require('../helpers/standardRespons');
const transactionsModel = require('../models/transactions');
const qtModels = require('../models/queryTransaction');
const errorResponse = require('../helpers/errorResponse');
const userModel=require('../models/users');
const bcrypt = require('bcrypt');
const{LIMIT_DATA}= process.env;

exports.getProfile = (req, res)=>{
  const {id}=req.authUser;
  //console.log('tes'+id)
  profilesModel.getLogedProfiles(id, (err, results)=>{
    //console.log(results);
    if(results.rows.length > 0){
      return response(res, 'Detail profiles', results.rows[0]);
    }
    else{return res.redirect('/404');
    }
  });
};

// exports.historyTransactions = (req, res)=>{
//   const {id}=req.authUser;
//   //console.log('tes'+id)
//   transactionsModel.getHistoryTransactions(id, (err, results)=>{
//     //console.log(results);
//     if(results.rows.length > 0){
//       return response(res, 'Detail profiles', results.rows[0]);
//     }
//     else{return res.redirect('/404');
//     }
//   });
// };
exports.historyTransactions = (req, res)=>{
  const {search_by='recipient', search='', sortBy='time', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;
  const {id}=req.authUser;
  const offset = (page - 1) * limit;

  transactionsModel.getHistoryFix(id, search_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    // console.log(results);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    transactionsModel.countAllHistoryTransactions(id, search_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      return response(res, 'list all users', results.rows, pageInfo);
    });
  });
};

exports.topup=(req, res)=>{
  const recipient_id=req.authUser.id;
  qtModels.topup(recipient_id, req.body, (err, results)=>{
    if(err){
      return errorResponse(err,res);
    }
    else{
      return response(res, 'Transaction success', results.rows[0]);
    }
  });
};

exports.updatePhonenumber=(req, res)=>{
  const id=req.authUser.id;
  profilesModel.updateProfiles(id, null, req.body, (err, results)=>{
    if(err){
      return errorResponse(err);
    }
    else{
      return response(res, 'Update phonenumber succesfully', results.rows[0]);
    }
  });
};

exports.transfer=(req, res)=>{
  const sender_id=req.authUser.id;
  userModel.getDetailUsers(sender_id,(err, results)=>{
    // console.log('res'+ results.rows[0].pin);
    const pinUser=results.rows[0].pin;
    // console.log('tes'+pinUser);
    // console.log('tes'+req.body.pin);
    if(pinUser.length <1){
      return res.redirect('/404');
    }
    else{
      if(req.body.pin==pinUser){
        profilesModel.getLogedProfiles(sender_id,(err,resultsMoney)=>{
          const myMoney = resultsMoney.rows[0];
          console.log(myMoney);
          console.log(req.body.amount);
          if(resultsMoney.length <1){
            return res.redirect('/404');
          }
          else{
            if(parseInt(myMoney.balance)>=req.body.amount){
              qtModels.transfer(sender_id, req.body, (err, results)=>{
                if(err){
                  return errorResponse(err,res);
                }
                else{
                  return response(res, 'Transaction success', results.rows[0]);
                }
              });
            }else{
              return response(res, 'Not enough money', null, null, 404);
            }
          }
        });
      }else{return response(res, 'Pin doesnt match', null, null, 404);
      }
    }
  });

};

exports.createPhone= (req, res)=>{
  const {id}= req.authUser;
  profilesModel.getLogedProfiles(id, (err, results)=>{
    if(results.rows.length >0){
      const profile= results.rows[0];
      console.log(profile);
      if(profile.phonenumber === null||profile.phonenumber===''){
        profilesModel.updateProfiles(profile.iduser, null, {phonenumber:req.body.phonenumber}, (err, resultUpdate)=>{
          const profileUpdated = resultUpdate.rows[0];
          console.log(profileUpdated);
          if(profileUpdated.iduser === profile.iduser){
            return response(res, 'Add Phone number success');
          }
        });
      }
      else{
        return response(res, 'Error: Phone number already set', null, null, 400);
      }
    }
    else{return response(res, 'Error: Failed to set Phone number', null, null, 400);
    }
  });
};

exports.updatePassword=(req, res)=>{
  const {id}=req.authUser;
  const {oldPassword, password, repeatPassword}=req.body;
  if(password !== repeatPassword){
    return response(res, 'Password doesnt match', null, null, 400);
  }
  userModel.getDetailUsers(id, (err, results)=>{
    if(results.rows.length <1){
      return response(res,'User not found', null, null, 400);
    }
    const user = results.rows[0];
    // console.log(user);
    // console.log(password);
    bcrypt.compare(oldPassword, user.password)
      .then((cpRes)=>{
        if(cpRes){
          bcrypt.hash(password, 10, (err, hash)=>{
            user.password=hash;
            console.log(user.password);
            userModel.updateUsers(id, user, (err, results)=>{
              console.log(err);
              if(err){
                return errorResponse(err, res);
              }
              else{
                return response(res, 'Update password succesfully', results[0]);
              }
            });
          });
        }else{
          return response(res, 'Old password doesnt match', null, null, 400);
        }
      })
      .catch(e =>{
        return response(res, 'Old password doesnt match', null, null, 404);
      });
  });
};


exports.updatePin=(req, res)=>{
  const {id}=req.authUser;
  const {oldPin}=req.body;
  console.log(req.body);
  userModel.getDetailUsers(id, (err, results)=>{
    if(results.rows.length <1){
      return response(res,'User not found', null, null, 400);
    }
    const user = results.rows[0];
    console.log(user.pin);
    if(user.pin==parseInt(oldPin)){
      userModel.updateUsers(id, req.body, (err, results)=>{
        if(err){
          return errorResponse(err, res);
        }
        else{
          return response(res, 'Update pin succesfully', results[0]);
        }
      });
    }else{
      return response(res, 'Pin doesnt match');
    }
  });
};

exports.updateProfiles = (req, res)=>{
  const id=req.authUser;
  console.log(req.body);
  console.log(req.file);
  let filename = null;
  if (req.file){
    filename = req.file.filename;
  }
  profilesModel.updateProfiles(id, filename, req.body, (err, results)=>{
    console.log(req.file);
    //console.log(err);
    if(err){
      return response(res, `Failed to update ${err.message}`, null,null,400);
    }
    else{
      return response(res, 'Update profile succesfully', results.rows[0]);
    }
  });
};

