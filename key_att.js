var con = require('./connect');
var key_att = {};

key_att.create = function (tablename){
    con.getConnection(function(err,conn){
        if (err) throw err;
        var sql = "SELECT `속성명` FROM scan_table WHERE `대표_결합키` IS NOT NULL;";
        conn.query(sql, function (err, rows,fields) {
            if (err) throw err;
            console.log(rows);
        });
        return;
    });
    
};
/*

var sql = "SELECT `속성명` FROM statistic_attribute WHERE `대표_결합키` IS NULL;";
connection.query(sql, function (err, result) {
  if (err) console.log(err);
  console.log('result',result); //row는 배열이다.

  return result;

});

connection.end();
*/

module.exports = key_att;