const express = require('express');
const app = express();
const path = require('path')
const qs = require('querystring')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mysql = require("mysql2/promise");
const server = app.listen(3000, ()=>{
  console.log('start server');
});

const id=0;
//connect db
const maria = require('mysql');
const { query } = require('express');
const conn = maria.createConnection({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'0000',
  database:'testdb'
});

conn.connect();
app.use(bodyParser.json());
app.use(favicon('./'+'favicon.ico'));

//id에 AUTHOR 넣으면 모든 row 가져올 수 있음
// app.get('/:id', (req, res)=>{
//   const values = req.params.id.toString()
//   var sql = 'SELECT * FROM '+values
  
//   conn.query(sql ,(err,row,fields)=>{
//     res.send(row)
//     //res.send(fields);
//   })
// });



//AUTHOR 테이블에 info row 추가
// const info ={
//   "id" : 11,
//   "name" : "db",
//   "profile" : "tester"
// }
// var sql = 'INSERT INTO AUTHOR(id,name,profile) VALUES(?,?,?)';
// var params = [info["id"], info["name"], info["profile"]]
// conn.query(sql, params, (err, rows, fields)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log(rows)
//   }
// })

//body 받아서 db에 추가
// app.post('/post', (req, res)=>{
//   console.log("통신");
//   console.log(req.body);
  
//   const {id, name, profile} = req.body;
    
//   var sql = 'INSERT INTO AUTHOR(id,name,profile) VALUES(?,?,?)';
//   var params = [id, name, profile];
//   conn.query(sql, params, (err, rows, fields)=>{
//     if(err){
//       res.send(err)
//     }else{
//       res.send(rows)
//       console.log("success")
//     }
//   })
// // });

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res); // 여기서 발생되는 에러들은 catch에서 잡힘
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};


const result=[]
const categorialProperties={}
let sql_createTable
let sql_insertRows
const insertValue=[]
///:id
app.get('/:id',  (req, res)=>{

  console.log("시작")
  
  

    const values = req.params.id.toString(); // table이름?

    var sqlDefault = 'SELECT * FROM '+values;//+' WHERE admission_date IS NULL'

    console.log(sqlDefault);
    conn.query(sqlDefault ,(err,row,fields)=>{
    if (err) console.log(err);
    console.log("1st");
    res.send(row);

    const keyForCategorial = []; // property이름들
    
    
  
    for (let i=0;i<fields.length;i++){
        if(fields[i].type != 3){ //
            keyForCategorial.push(fields[i].name);
            categorialProperties[fields[i].name] = [];
        }
    }
    

    for (let i=0;i<row.length;i++){
      for (let j=0;j<keyForCategorial.length;j++){
        categorialProperties[keyForCategorial[j]].push(row[i][keyForCategorial[j]]);
      }
    }
    

    //// 속성의 데이터 타입         ->
    const typeOfCategory=[]
    for (let i=0;i<keyForCategorial.length;i++){
      
      typeOfCategory.push(typeof(categorialProperties[keyForCategorial[i]][0])); //// object타입에서 어케 처리를 하든, fields에서 보고 처리하든 합시당. integer/text로 나누는지 아닌지는 확인해보고.
    }

    /// null 레코드 수. 모든 column에 null이 있다면 where로 null없는 애들만 갖고와서는 전체 row개수를 모를 듯. -> 다 들고 와서 분석해야지 머.
    const nullNum = []; // 속성별로. (보여주는 것도 속성별로니까.)
    const nullRate = [];
    for (let j=0;j<keyForCategorial.length;j++){
      nullNum.push(0);
      
      for (let i =0;i<row.length;i++){
        
        
        if(categorialProperties[keyForCategorial[j]][i]===null){
          
          nullNum[j]+=1;
        }
      }
      nullRate[j] = nullNum[j]/row.length;
    }
   
    /// 상이 범주 값(distinct count)
    const setArray = []
    const distinctCount=[]
    for (let i=0;i<keyForCategorial.length;i++){
      
      if (typeOfCategory[i] === "object"){
  
        
        categorialProperties[keyForCategorial[i]] = categorialProperties[keyForCategorial[i]].map(x=>JSON.parse(JSON.stringify(x))); /// 덮어쓰기. 이케해도 되는지 모르겠네.
      }
      setArray.push(new Set(categorialProperties[keyForCategorial[i]]));  /// date같은 object 타입이 오면, string변환 후 같은지 확인해야겠다.
      distinctCount.push(setArray[i].size)
    }


    // 특수문자포함 레코드 수 , 특수문자 포함 레코드 비율

    const spNum=[];
    const spRate=[];
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/;
    // console.log(categorialProperties[keyForCategorial[2]])
    for (let i=0;i<keyForCategorial.length;i++){
      spNum.push(0);
      for(let j=0;j<row.length;j++){
        if(special_pattern.test(categorialProperties[keyForCategorial[i]][j]) === true){
          spNum[i] +=1;
        }
      }
      spRate.push(spNum[i]/row.length)
    }
    
  

    for(let i=0;i<keyForCategorial.length;i++){
      
      insertValue.push([keyForCategorial[i], typeOfCategory[i],nullNum[i],nullRate[i],distinctCount[i],spNum[i],spRate[i],null,null,null]);
      // console.log(insertValue[i])
    }

    sql_createTable="CREATE TABLE students_conditional (conditional_id INT NOT NULL AUTO_INCREMENT, "+  
                          "property_name TEXT, "+"data_type TEXT, "+
                          "null_records_num INT, "+
                          "null_records_rate DOUBLE, "+"distinct_num INT, "+
                          "special_records_num INT, "+ "special_records_rate DOUBLE, "+
                          "representive_property TEXT, "+
                          "candidate_key TEXT, "+
                          "representive_key TEXT, "+
                          "PRIMARY KEY(conditional_id))";
  
    sql_insertRows="INSERT INTO students_conditional (property_name, data_type, null_records_num, "+
                  "null_records_rate, distinct_num,special_records_num,special_records_rate,representive_property, "+
                  "candidate_key, representive_key) VALUES (?,?,?,?,?,?,?,?,?,?);";
    
    console.log(sql_createTable)
    conn.query(sql_createTable ,(err,row,fields)=>{
      if(err){
        console.log(err)
      }else{
        
        for(let i=0;i<insertValue.length;i++){
          
          conn.query(sql_insertRows, insertValue[i],(err,row,fields)=>{
            if(err){
              console.log(err);
              
            }else{
              
            }
          });
      }
    }}

    
    
  );
    

    
  })
  


  
    
  
  
  console.log("Done")
});
  
/////    쿼리스트링
app.get('/modify/:id',(req,res)=>{
  


  
  const conditional={};
  const values = req.params.id.toString(); // table이름?
  // console.log(values);
  var sqlDefault = 'SELECT * FROM '+values+'_conditional';//+' WHERE admission_date IS NULL'
  // console.dir(res)
  console.log(sqlDefault);
  
  
  conn.query(sqlDefault ,(err,row,fields)=>{
    
    for(let i=1;i<fields.length;i++){ // id제외
      for(let j=0;j<row.length;j++){
        console.log(row);
        conditional[fields[i].name]=[]
      }
      for(let j=0;j<row.length;j++){
        console.log(row);
        conditional[fields[i].name].push(row[j][fields[i].name]);
      }
      
    }
    console.log(conditional)
    res.send(conditional);

  //   stringify(conditional, {
  //     header:true
  //   },function(err,output){
  //     fs.writeFile("./csv/result.csv",output);
  //   })
  //   //// 뭐가되었든 json형식으로 만들어서 상대가 받을 수 있또록.
  //  });
  })
  
});
// app.get('/modify/:id', (req, res)=>{
  
// });