const db = require('../helpers/db');

exports.getAllTranstype = (cb)=>{
  db.query('SELECT * FROM transactiontype', (err, res)=>{
    cb(res.rows);
  });
};

exports.createTranstype=(data, cb)=>{
  const q = 'INSERT INTO transactiontype(name, description) VALUES ($1, $2) RETURNING *';
  const val = [data.name, data.description];
  db.query(q, val, (err, res)=>{
    //console.log(err);
    cb(res.rows);
  });
};

exports.updateTranstype=(id, data, cb)=>{
  const q = 'UPDATE transactiontype SET name=$1, description=$2 WHERE id=$3 RETURNING *';
  const val = [data.name, data.description, id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
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