const db = require('../helpers/db');
const {LIMIT_DATA}=process.env;

// exports.getAllTransactions = (cb)=>{
//   db.query('SELECT * FROM transactions', (err, res)=>{
//     cb(res.rows);
//   });
// };
exports.getAllTransactions = (search_by, keyword, sortBy, sorting, limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  db.query(`SELECT * FROM transactions WHERE ${search_by} = ${keyword} ORDER BY ${sortBy} ${sorting} limit $1 offset $2`, [limit, offset], (err, res)=>{
    console.log(res);
    cb(err, res.rows);
  });
};

//count users
exports.countAllTransactions = (search_by, keyword, cb)=>{
  db.query(`SELECT * FROM transactions WHERE ${search_by} = ${keyword}`, (err, res)=>{
    cb(err, res.rowCount);
  });
};



exports.createTransactions=(data, cb)=>{
  const time1 = new Date();
  console.log(time1);
  const q = 'INSERT INTO transactions(notes, recipient_id, sender_id, amount, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.notes, data.recipient_id, data.sender_id, data.amount, time1, data.type_id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    if(res){
      //console.log(res);
      cb(err, res);
    }else{
      cb(err); 
    }
    // cb(res.rows);
  });
};

exports.updateTransactions=(id, data, cb)=>{
  const q = 'UPDATE transactions SET notes=$1, recipient_id=$2, sender_id=$3, amount=$4, time=$5, type_id=$6 WHERE id=$7 RETURNING *';
  const val = [data.notes, data.recipient_id, data.sender_id, data.amount, data.time, data.type_id, id];
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

exports.deleteTransactions=(id, data, cb)=>{
  const q = 'DELETE FROM transactions WHERE ID=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.getDetailTransactions = (id, cb)=>{
  const q = 'SELECT * FROM transactions WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};
exports.getHistoryTransactions = (id, cb)=>{
  const q = 'SELECT * FROM transactions WHERE sender_id=$1 or recipient_id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    console.log(res);
    cb(err, res);
  });
};