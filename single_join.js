var con = require('./connect');
var single_join = {};

//table명이랑 att에 해당되는 대표결합키 받아올 방법 찾기
single_join.create = function (req, res, table1, table2, att1, att2){
  con.getConnection((err,conn)=>{
    const sql = "SELECT * FROM "+table1+" JOIN "+table2+" ON "+att1+" = "+att2;
    console.log(sql)
    conn.query(sql, (err,row)=>{
      res.send(row)
      console.log("single join")
    })
  })
  return;
}
module.exports = single_join;