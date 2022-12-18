var con = require('./connect');
const fs = require('fs')
const dbInfo = JSON.parse(fs.readFileSync('./db.json'));
var scan_done_table = {};

scan_done_table.create = function (fileName){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists scan_done_table(테이블_명 VARCHAR(255), 레코드_수 int, 대표_속성 VARCHAR(255), 대표_결합키 VARCHAR(255));";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = 'insert into scan_done_table(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_name="'+fileName+'"';
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        //대표_속성, 대표_결합키 SQL문 필요
        return ;
    });
}

module.exports = scan_done_table;