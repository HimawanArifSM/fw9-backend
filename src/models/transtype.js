const db = require('../helpers/db');
const {LIMIT_DATA}=process.env;

// exports.getAllTranstype = (cb)=>{
//   db.query('SELECT * FROM transactiontype', (err, res)=>{
//     cb(res.rows);
//   });
// };
exports.getAllTranstype = (search_by, keyword, sortBy, sorting, limit=parseInt(LIMIT_DATA), offset=0, cb)=>{
  db.query(`SELECT * FROM transactiontype WHERE ${search_by} LIKE '%${keyword}%' ORDER BY ${sortBy} ${sorting} LIMIT $1 OFFSET $2`, [limit, offset], (err, res)=>{
    console.log(err);
    cb(err, res.rows);
  });
};
//count Transtype
exports.countAllTranstype = (search_by, keyword, cb)=>{
  db.query(`SELECT * FROM transactiontype WHERE ${search_by} LIKE '%${keyword}%'`, (err, res)=>{
    cb(err, res.rowCount);
  });
};


exports.createTranstype=(data, cb)=>{
  const q = 'INSERT INTO transactiontype(name, description) VALUES ($1, $2) RETURNING *';
  const val = [data.name, data.description];
  db.query(q, val, (err, res)=>{
    //console.log(err);
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
    // cb(res.rows);
  });
};

exports.updateTranstype=(id, data, cb)=>{
  const q = 'UPDATE transactiontype SET name=$1, description=$2 WHERE id=$3 RETURNING *';
  const val = [data.name, data.description, id];
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

exports.deleteTranstype=(id, data, cb)=>{
  const q = 'DELETE FROM transactiontype WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.getDetailTranstype = (id, cb)=>{
  const q = 'SELECT * FROM transactiontype WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};