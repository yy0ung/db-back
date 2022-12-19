var con = require('./connect');
var multi_join_result = {};

multi_join_result.create = function (table1, table2){
    con.getConnection(function(err,conn){

        for(let i=0; i<table2.length; i++){
          var sql = "create table if not exists mres_"+table1+"_"+table2[i]+"(테이블A VARCHAR(255), 테이블A_레코드_수 int, 결합키_속성A VARCHAR(255),  테이블B VARCHAR(255), 테이블B_레코드_수 int, 결합키_속성B VARCHAR(255), 대표_결합키 VARCHAR(255), 결과_레코드_수 int, 결합_성공률_W1 real, 결합_성공률_W2 real);";
          conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
          });
          var sql2 = "insert into mres_"+table1+"_"+table2[i]+"(테이블A, 테이블A_레코드_수, 테이블B, 테이블B_레코드_수) select a.table_name, a.TABLE_ROWS, b.table_name, b.TABLE_ROWS from INFORMATION_SCHEMA.tables a, INFORMATION_SCHEMA.tables b where a.table_name='"+table1+"' and b.table_name='"+table2[i]+"'";
          conn.query(sql2, function (err, result) {
            if (err) throw err;
            console.log("Table created");
          });
        }
        
        

        return ;
    });
}

module.exports = multi_join_result;