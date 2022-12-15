const fs = require('fs');
var maria = require('mysql');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

module.exports = function () {
    const conn = maria.createPool({
        host: conf.host,
        port: conf.port,
        user: conf.user,
        password:conf.password,
        database:conf.database
    });
  return {
    getConnection: function (callback) {    // connection을 생성하여 리턴합니다
      conn.getConnection(callback);
    },
    end: function(callback){
      conn.end(callback);
    }
  }
}();