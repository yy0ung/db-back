var con = require('./connect');
var multi_join = {};

//table명이랑 att에 해당되는 대표결합키 받아올 방법 찾기
multi_join.create = function (tablename){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM table_1 JOIN table_2 ON table_1.att_1 = table_2.att_2";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("multi_join table created");
    });
  });
  return;
}
module.exports = select_table;