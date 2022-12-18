var con = require('./connect');
var select_table = {};

select_table.create = function (fileName){ ////   fileName을 이용하도록 추가
    con.getConnection(function(err,conn){
        var sql = "create table if not exists selecttable(테이블_명 VARCHAR(255), 레코드_수 int, 속성 VARCHAR(255), 스캔여부 boolean);";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = "insert into selecttable(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_schema='dbproject' and not table_name in ('selecttable','statistic_attribute','category_attribute','scantable')";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        
        //속성 update 필요   -> insert문에서 update문으로 바꿈.
        var sql = "update selecttable set 속성= (SELECT group_concat(COLUMN_NAME) FROM information_schema.columns) WHERE TABLE_NAME = '"+fileName+"'";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        return ;
    });
}

module.exports = select_table;
