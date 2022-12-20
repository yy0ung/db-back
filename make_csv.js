
var con = require('./connect');
const fs = require("fs");
var make_csv = {};


function jsonToCSV(json_data) {

    // 1-1. json 데이터 취득
    const json_array = json_data;
    let csv_string = '\uFEFF';
    const titles = Object.keys(json_array[0]);
    titles.forEach((title, index)=>{
        csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`);
    });
    json_array.forEach((content, index)=>{
        let row = ''; 
        for(let title in content){ 
            // 
            row += (row === '' ? `${content[title]}` : `,"${content[title]}"`);
        }
        //
        csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`);
    })
    // 
    return csv_string;
}



make_csv.make = function (tablename){

    const tablename = "category_attribute";
    // const filepath = "./csvFiles/result_"+tablename+".csv";
    const filepath = "./"+tablename+".csv"; /////////////// 여기서 path 수정 가능. 원하는 곳으로. 
    const ws = fs.createWriteStream(filepath);
    cnn.getConnection(function(err,connn){
        var sql = "";
        connn.query("SELECT * FROM "+tablename, function (err, thedata, fields) {
            if (err) throw err;
            
            const jsonData = JSON.parse(JSON.stringify(thedata))
            
            const csv_string = jsonToCSV(jsonData);
            console.log(csv_string)
            fs.writeFileSync(filepath,csv_string);
            fastcsv.write(jsonData, {headers:true})
        });
        connn.release();
        return ;
    });
}

module.exports = make_csv;
/// npm i fast-csv
