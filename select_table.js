var con = require('./connect');
var select_table = {};

select_table.create = function (){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists selecttable(테이블_명 VARCHAR(255), 레코드_수 int, 속성 VARCHAR(255));";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = "insert into selecttable(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_schema='dbproject' and not table_name in ('selecttable','statistic_attribute','category_attribute')";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        /*
        var sql = "select 테이블_명 from selecttable";
        conn.query(sql, function (err, rows, fields){
            for(var i=0; i<rows.length; i++){
                var tname=rows[i].테이블_명;
                var tmp = "";
                conn.query("select column_name from information_schema.columns where table_name='"+tname+"'",function(err,r,field){
                    for(var j=0;j<r.length;j++){
                        tmp+=r[j].column_name;
                    }
                    conn.query("update selecttable set 속성 = '"+tmp+"' where 테이블_명 ="+tname);
                    console.log(tmp);
                });
            }
        });
        */
        return ;
    });
}

module.exports = select_table;