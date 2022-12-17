var con = require('./connect');
var update_attr = {};


update_attr.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const {table, attr, name} = req.body
    console.log(attr, name)
    var sql = 'UPDATE '+table+' SET 대표_속성=(?) where 속성명=(?)';
    var params = [attr, name]
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

module.exports = update_attr;