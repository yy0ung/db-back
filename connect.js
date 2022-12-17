const fs = require('fs');
var maria = require('mysql');
const dbInfo = JSON.parse(fs.readFileSync('./db.json'));

module.exports = function () {
    const conn = maria.createPool({
      host: dbInfo.host,
      port: dbInfo.port,
      user: dbInfo.user,
      password: dbInfo.password,
      database: dbInfo.database
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