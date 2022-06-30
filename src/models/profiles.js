const db = require('../helpers/db');

exports.getAllProfiles = (cb)=>{
  db.query('SELECT * FROM profiles', (err, res)=>{
    cb(res.rows);
  });
};

exports.createProfiles=(data, cb)=>{
  const q = 'INSERT INTO profiles(iduser, fullname, balance, picture, phonenumber) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const val = [data.iduser, data.fullname, data.balance, data.picture, data.phonenumber];
  db.query(q, val, (err, res)=>{
    //console.log(err);
    cb(res.rows);
  });
};

exports.updateProfiles=(id, data, cb)=>{
  const q = 'UPDATE profiles SET fullname=$1, balance=$2, picture=$3, phonenumber=$4 WHERE id=$5 RETURNING *';
  const val = [data.fullname, data.balance, data.picture, data.phonenumber, id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};

exports.deleteProfiles=(id, data, cb)=>{
  const q = 'DELETE FROM profiles WHERE ID=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.getDetailProfiles = (id, cb)=>{
  const q = 'SELECT * FROM profiles WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};