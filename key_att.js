var con = require('./connect');
var key_att = {};

key_att.create = function (tablename){
    con.getConnection(function(err,conn){
        var sql = "SELECT `속성명` FROM scan_table WHERE `대표_결합키` IS NOT NULL;";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        return result;
    });
    
};


module.exports = key_att;