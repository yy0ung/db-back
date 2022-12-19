var con = require('./connect');
const fs = require('fs')
const dbInfo = JSON.parse(fs.readFileSync('./db.json'));
var csv_done_table = {};

csv_done_table.create = function (fileName){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists csv_done_table(테이블_명 VARCHAR(255), 레코드_수 int, 속성 VARCHAR(3000), 스캔여부 boolean);";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        //insert into selecttable(속성) SELECT group_concat(COLUMN_NAME) FROM information_schema.columns WHERE TABLE_NAME = '"+fileName+"'"
        var sql = 'insert into csv_done_table(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_name="'+fileName+'"';
        console.log(sql)
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        //속성 update 필요
        //"Unknown column 'table_name' in 'where clause'" 에러
        var sql = 'update csv_done_table set 속성= (SELECT group_concat(COLUMN_NAME) FROM information_schema.columns) WHERE 테이블_="'+fileName+'"';
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });

        return ;
    });
}

module.exports = csv_done_table;
