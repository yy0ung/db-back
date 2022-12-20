var con = require('./connect');
var key_att = {};

key_att.create = async function (req, res, tablename, key){
  con.getConnection(function(err,conn){
    var rst =[]
    if (err) throw err;
    
    var sql = "SELECT `속성명` FROM "+tablename+"_category_attribute WHERE `대표_결합키`='"+key+"'";
    conn.query(sql, function (err, rows,fields) {
      if (err) throw err;
      console.log(rows)
      if(rows.length==0){
        var sql2 = "SELECT `속성명` FROM "+tablename+"_statistic_attribute WHERE `대표_결합키`='"+key+"'";
        conn.query(sql2, function (err2, rows2,fields2) {
        if (err) throw err;
        console.log(1,1, rows2)
        res.send(rows2)
        
    });
      }else{
        console.log(2,2, rows)
        res.send(rows)
          
      }
  });
  })
    return;
    
};

module.exports = key_att;