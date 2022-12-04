const fs = require('fs');
const express = require('express');
const app = express();
//const path = require('path');
//const qs = require('querystring');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const server = app.listen(3000, ()=>{console.log('start server');});

//connect db
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const maria = require('mysql');

const conn = maria.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password:conf.password,
  database:conf.database
});

conn.connect();
//app.use(bodyParser.json())

app.get('/api/1_fitness_measurement/TEST_AGE',(req,res) => {
  const elem1="TEST_AGE";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM 1_fitness_measurement a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/TEST_CNT',(req,res) => {
  const elem1="TEST_CNT";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM 1_fitness_measurement a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/TEST_YMD',(req,res) => {
  const elem1="TEST_YMD";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM 1_fitness_measurement a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/PHONE_NUM',(req,res) => {
  const elem1="PHONE_NUM";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/MAIL_ADDR',(req,res) => {
  const elem1="MAIL_ADDR";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/CENTER_NM',(req,res) => {
  const elem1="CENTER_NM";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/AGE_GBM',(req,res) => {
  const elem1="AGE_GBN";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/TEST_GBN',(req,res) => {
  const elem1="TEST_GBN";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/INPUT_GBN',(req,res) => {
  const elem1="INPUT_GBN";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/CERT_GBN',(req,res) => {
  const elem1="CERT_GBN";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/1_fitness_measurement/TEST_SEX',(req,res) => {
  const elem1="TEST_SEX";
  const elem2="1_fitness_measurement"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/OPERTN_YEAR',(req,res) => {
  const elem1="OPERTN_YEAR";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/PRCTTQ_TOT_SCORE',(req,res) => {
  const elem1="PRCTTQ_TOT_SCORE";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/ORSTT_TOT_SCORE',(req,res) => {
  const elem1="ORSTT_TOT_SCORE";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/TEL_NO',(req,res) => {
  const elem1="TEL_NO";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/EMAIL_ADDRESS',(req,res) => {
  const elem1="EMAIL_ADDRESS";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/QUALF_GRAD_NM',(req,res) => {
  const elem1="QUALF_GRAD_NM";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/CRSE_NM',(req,res) => {
  const elem1="CRSE_NM";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/EMPR_NO',(req,res) => {
  const elem1="EMPR_NO";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/PRCTTQ_PSEXAM_FLAG_NM',(req,res) => {
  const elem1="PRCTTQ_PSEXAM_FLAG_NM";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/LAST_PSEXAM_AT',(req,res) => {
  const elem1="LAST_PSEXAM_AT";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/2_physical_instructor_practice_info/QUALF_ITEM_NM',(req,res) => {
  const elem1="QUALF_ITEM_NM";
  const elem2="2_physical_instructor_practice_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/OPERTN_YEAR',(req,res) => {
  const elem1="OPERTN_YEAR";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/WRTNG_TOT_SCORE',(req,res) => {
  const elem1="WRTNG_TOT_SCORE";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/TEL_NUM',(req,res) => {
  const elem1="TEL_NUM";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/MAIL_ADDR',(req,res) => {
  const elem1="MAIL_ADDR";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/QUALF_GRAD_NM',(req,res) => {
  const elem1="QUALF_GRAD_NM";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});


app.get('/api/3_physical_instructor_writing_info/CRSE_NM',(req,res) => {
  const elem1="CRSE_NM";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/EMPR_NO',(req,res) => {
  const elem1="EMPR_NO";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});


app.get('/api/3_physical_instructor_writing_info/WRTNG_PSEXAM_FLAG_NM',(req,res) => {
  const elem1="WRTNG_PSEXAM_FLAG_NM";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/LAST_PSEXAM_AT',(req,res) => {
  const elem1="LAST_PSEXAM_AT";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/3_physical_instructor_writing_info/QUALF_ITEM_NM',(req,res) => {
  const elem1="QUALF_ITEM_NM";
  const elem2="3_physical_instructor_writing_info"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/age',(req,res) => {
  const elem1="age";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/fnlwgt',(req,res) => {
  const elem1="fnlwgt";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/education_num',(req,res) => {
  const elem1="education_num";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/capital_gain',(req,res) => {
  const elem1="capital_gain";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/capital_loss',(req,res) => {
  const elem1="capital_loss";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/hours_per_week',(req,res) => {
  const elem1="hours_per_week";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/phone_number',(req,res) => {
  const elem1="phone_number";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/4_census_income/email_address',(req,res) => {
  const elem1="email_address";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/workclass',(req,res) => {
  const elem1="workclass";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/education',(req,res) => {
  const elem1="education";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/marital_status',(req,res) => {
  const elem1="marital_status";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/occupation',(req,res) => {
  const elem1="occupation";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/relationship',(req,res) => {
  const elem1="relationship";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/race',(req,res) => {
  const elem1="race";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/sex',(req,res) => {
  const elem1="sex";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
app.get('/api/4_census_income/native_country',(req,res) => {
  const elem1="native_country";
  const elem2="4_census_income"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/age',(req,res) => {
  const elem1="age";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/balance',(req,res) => {
  const elem1="balance";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/day',(req,res) => {
  const elem1="day";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/duration',(req,res) => {
  const elem1="duration";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/campaign',(req,res) => {
  const elem1="campaign";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/pdays',(req,res) => {
  const elem1="pdays";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/previous',(req,res) => {
  const elem1="previous";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 수치 값',t.bbb '최대 값',t.ccc '최소 값', u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa', MAX(age) 'bbb', MIN(age) 'ccc' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/contect_num',(req,res) => {
  const elem1="contect_num";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/contect_mail',(req,res) => {
  const elem1="contect_mail";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/job',(req,res) => {
  const elem1="job";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/marital',(req,res) => {
  const elem1="marital";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/education',(req,res) => {
  const elem1="education";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/df',(req,res) => {
  const elem1="df";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/housing',(req,res) => {
  const elem1="housing";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/loan',(req,res) => {
  const elem1="loan";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/contact',(req,res) => {
  const elem1="contact";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/5_bank_marketing/month',(req,res) => {
  const elem1="month";
  const elem2="5_bank_marketing"
  var sql = "SELECT h.aaa '속성명',h.bbb '데이터 타입', u.num_null 'NULL 레코드 수', u.null_ratio 'NULL 레코드 비율',t.aaa '상이 범주 값',u.num0 '0 레코드 수', u.0ratio '0 레코드 비율' FROM (SELECT MAX(num_of_age) 'aaa' FROM (SELECT a."+elem1+" 'age',COUNT(a."+elem1+") 'num_of_age' FROM "+elem2+" a GROUP BY a."+elem1+") k) t, (SELECT column_name 'aaa', data_type 'bbb' FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='"+elem2+"' and column_name='"+elem1+"') h, (SELECT e.aaa 'num0', e.aaa/COUNT(*) '0ratio',q.aaa 'num_null', q.aaa/COUNT(*) 'null_ratio', COUNT(*) FROM (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+" IS NULL) q, "+elem2+" w, (SELECT COUNT("+elem1+") 'aaa' FROM "+elem2+" WHERE "+elem1+"=0) e) u GROUP BY t.aaa;";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});


app.get('/api/table',(req,res) => {
  conn.query(
    "SELECT table_name 테이블명 FROM information_schema.tables WHERE table_schema= 'dbproject' ",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});
