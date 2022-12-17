var con = require('./connect');
var edit_type = {};

edit_type.create = (req,res) =>{
  con.getConnection((err,conn)=>{
    const {table, type, name} = req.body
    var sql = 'UPDATE '+table+' SET 데이터_타입=(?) where 속성명=(?)';
    var params = [type, name]
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

module.exports = edit_type;