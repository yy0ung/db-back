var con = require('./connect');
var upload_csv = {};

upload_csv.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const fileName = './asset/'+req.file.filename
    var sql = "LOAD DATA LOCAL INFILE ? INTO TABLE "+req.file.filename+" FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS"
  
    var params = [fileName]
    conn.query(sql, params, (err,row,fields)=>{
      if(err){
        //throw err
        return res.send(err)
      }else{
        console.log("success")
        return res.send("성공")
      }
    })
  })
}


module.exports = upload_csv;

  