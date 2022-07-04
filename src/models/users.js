const db = require('../helpers/db');

const {LIMIT_DATA}=process.env;

//GET USER
exports.getAllUsers = (keyword, limit=parseInt(LIMIT_DATA), offset=0, cb)=>{
  db.query(`SELECT * FROM users WHERE username LIKE '%${keyword}%' ORDER BY id ASC LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
    cb(err, res.rows);
  });
};

//count users
exports.countAllsers = (keyword, cb)=>{
  db.query(`SELECT * FROM users WHERE username LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};

//CREATE
exports.createUsers=(data, cb)=>{
  const q = 'INSERT INTO users(username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING *';
  const val = [data.username, data.email, data.password, data.pin];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
    // cb(res.rows);
  });
};

//UPDATE
exports.updateUsers=(id, data, cb)=>{
  const q = 'UPDATE users SET username=$1, email=$2, password=$3, pin=$4 WHERE id=$5 RETURNING *';
  const val = [data.username, data.email, data.password, data.pin, id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    if(res){
      cb(err, res.rows);
    }else{
      cb(err);
    }
    // cb(res.rows);
  });
};

//DDELETE
exports.deleteUsers=(id, data, cb)=>{
  const q = 'DELETE FROM users WHERE ID=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

//GET DETAIL
exports.getDetailUsers = (id, cb)=>{
  const q = 'SELECT * FROM users WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};