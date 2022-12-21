var con = require('./connect');
const fastcsv = require("fast-csv");
const fs = require("fs");

var make_csv = {};

make_csv.get = function (req, res, tablename){
    const ws = fs.createWriteStream("result_"+tablename+".csv")
    con.getConnection(function(err,conn){
        var sql = "SELECT * FROM "+tablename;
        conn.query(sql, function (err, data, fields) {
            if (err) throw err;

            const jsonData = JSON.parse(JSON.stringify(data))
            //console.log("Table created");

            fastcsv.write(jsonData, {headers:true})
            .on("finish", function(){
                console.log("write csv successfully");
            })
            .pipe(ws);
            res.send(true)
        });
        return ;
    });
}

module.exports = make_csv;
/// npm i fast-csv