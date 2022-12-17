var con = require('./connect');
var update_key = {};


update_key.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const {table, key, name} = req.body
    var sql = 'UPDATE '+table+' SET 대표_결합키=(?) where 속성명=(?)';
    var params = [key, name]
    conn.query(sql, params, (err, rows, fields)=>{
      if(err){
        res.send(err)
        console.log(err)
      }else{
        res.send(rows)
        console.log("success")
      }
    })
  })
}

module.exports = update_key;