var con = require('./connect');
var key_att = {};

key_att.create = function (req, res, tablename, key){
    con.getConnection(function(err,conn){
        let rst = []
        if (err) throw err;
        for(let i =0; i<tablename.length; i++){
          var sql = "SELECT `속성명` FROM "+tablename[i]+"_category_attribute WHERE `대표_결합키`='"+key+"'";
          conn.query(sql, function (err, rows,fields) {
            if (err) throw err;
            if(rows.length==0){
              var sql2 = "SELECT `속성명` FROM "+tablename[i]+"_statistic_attribute WHERE `대표_결합키`='"+key+"'";
              conn.query(sql2, function (err2, rows2,fields2) {
              if (err) throw err;
              res.send(rows2)
            
        });
            }else{
              res.send(rows)
            }
        });
        
        }
        
        
        
        return;
    });
    
};

module.exports = key_att;