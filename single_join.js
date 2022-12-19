var con = require('./connect');
var single_join = {};

//table명이랑 att에 해당되는 대표결합키 받아올 방법 찾기
single_join.create = function (req, res, table1, table2, att1, att2){
  con.getConnection((err,conn)=>{
   const sql2 = "CREATE TABLE if not exists single_"+table1+"_"+table2+" SELECT * FROM "+table1+" JOIN "+table2+" ON "+att1+" = "+att2;
    console.log(sql2)
    conn.query(sql2, (err,row)=>{
      console.log("create join")
    })
  })
  return;
}
module.exports = single_join;