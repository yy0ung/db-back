var con = require('./connect');
var single_join_result = {};

single_join_result.create = function (table1, table2, key){
  //key는 대표결합키를 의미
    con.getConnection(function(err,conn){
        var sql = "create table if not exists single_join_result(테이블A VARCHAR(255), 테이블A_레코드_수 int, 결합키_속성A VARCHAR(255),  테이블B VARCHAR(255), 테이블B_레코드_수 int, 결합키_속성B VARCHAR(255), 대표_결합키 VARCHAR(255), 결과_레코드_수 int, 결합_성공률_W1 real, 결합_성공률_W2 real);";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        
        var sql = "insert into single_join_result(테이블A, 테이블A_레코드_수, 테이블B, 테이블B_레코드_수) select a.table_name, a.TABLE_ROWS, b.table_name, b.TABLE_ROWS from INFORMATION_SCHEMA.tables a, INFORMATION_SCHEMA.tables b where a.table_name='"+table1+"' and b.table_name='"+table2+"'";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });

        conn.query("update single_join_result SET 결합키_속성A =(SELECT a.속성명 AS 결합키_속성A FROM (SELECT 속성명,대표_결합키 FROM "+table1+"_statistic_attribute UNION SELECT 속성명,대표_결합키 FROM "+table1+"_category_attribute) a WHERE a.`대표_결합키`='"+key+"') where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        conn.query("update single_join_result SET 결합키_속성B =(SELECT a.속성명 AS 결합키_속성B FROM (SELECT 속성명,대표_결합키 FROM "+table2+"_statistic_attribute UNION SELECT 속성명,대표_결합키 FROM "+table2+"_category_attribute) a WHERE a.`대표_결합키`='"+key+"') where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        conn.query("update single_join_result SET 대표_결합키 ='"+key+"' where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        conn.query("update single_join_result SET 결과_레코드_수 =(SELECT COUNT(*) FROM single_"+table1+"_"+table2+") where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        conn.query("update single_join_result SET 결합_성공률_W1 =결과_레코드_수/(SELECT COUNT(*) FROM "+table1+") where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        conn.query("update single_join_result SET 결합_성공률_W2 =결과_레코드_수/(SELECT COUNT(*) FROM "+table2+") where 테이블A='"+table1+"' and 테이블B='"+table2+"'");
        return ;
    });
}

module.exports = single_join_result;