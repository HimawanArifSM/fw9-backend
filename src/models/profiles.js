const db = require('../helpers/db');
const {LIMIT_DATA}=process.env;


exports.getAllProfiles = (search_by, keyword, sortBy, sorting, limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  db.query(`SELECT * FROM profiles WHERE ${search_by} LIKE '%${keyword}%' ORDER BY ${sortBy} ${sorting} limit $1 offset $2`, [limit, offset], (err, res)=>{
    console.log(res);
    cb(err, res.rows);
  });
};

//count users
exports.countAllProfiles = (search_by, keyword, cb)=>{
  db.query(`SELECT * FROM profiles WHERE ${search_by} LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};

exports.createProfiles=(picture, data, cb)=>{
  const val=[];
  console.log(val);
  const filtered = {};
  const obj ={picture, iduser:data.iduser, fullname:data.fullname, balance:data.balance, phonenumber:data.phonenumber};
  for(let x in obj){
    if(obj[x]!==null){
      filtered[x]=obj[x];
      val.push(obj[x]);
    }
  }
  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind)=>`$${ind+1}`);
  const q = `INSERT INTO profiles(${key}) VALUES (${finalResult}) RETURNING *`;
  db.query(q, val, (err, res)=>{
    console.log(err);
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
    //cb(res.rows);
  });
};

exports.updateProfiles=(id, picture, data, cb)=>{
  let val = [id];
  const filtered = {};
  const obj ={picture, 
    fullname:data.fullname, 
    balance:data.balance, 
    phonenumber:data.phonenumber};
  for(let x in obj){
    if(obj[x]!==null){
      if(obj[x]!==undefined){
        console.log(obj[x]);
        filtered[x]=obj[x];
        val.push(obj[x]);
      }
    }
  }
  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind)=>`${o}=$${ind+2}`);
  const q = `UPDATE profiles SET ${finalResult} WHERE iduser=$1 RETURNING *`;
  db.query(q, val, (err, res)=>{
    console.log(res);
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
    // cb(res.rows);
  });
};

exports.deleteProfiles=(id, data, cb)=>{
  const q = 'DELETE FROM profiles WHERE iduser=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.getDetailProfiles = (id, cb)=>{
  const q = 'SELECT * FROM profiles WHERE iduser=$1';
  const val = [id];
  console.log(id);
  db.query(q, val, (err, res)=>{
    console.log(res);
    cb(err, res.rows);
  });
};

exports.getLogedProfiles = (id, cb)=>{
  const q = 'SELECT * FROM profiles join users on profiles.iduser=users.id WHERE iduser=$1';
  const val = [id];
  //console.log(id);
  db.query(q, val, (err, res)=>{
    // console.log(res);
    cb(err, res);
  });
};

