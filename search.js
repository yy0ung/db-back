var search = {};

search.create = function (tablename, key, att, attName){
    var sql = "select * from scantable";
    if (tablename==0 && key==0 && att==0 && attName==0)
        var sql = "select * from scantable";
    else if(tablename==0 && key==0 && att==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
    else if(tablename==0 && key==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 대표_속성='"+att+"';";
    else if(tablename==0 && att==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 대표_결합키='"+key+"'";
    else if(key==0 && att==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명='"+tablename+"'";
    else if(tablename==0 && key==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 대표_속성='"+att;
    else if(tablename==0 && att==0)
        var sql = "SELECT * FROM scantable WHERE 대표_결합키='"+key+"' and 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
    else if(tablename==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 대표_결합키='"+key+"' and 대표_속성='"+att;
    else if(key==0 && att==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명='"+tablename+"' and 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
    else if(key==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명='"+tablename+"' and 대표_속성='"+attName+"';";
    else if(att==0 && attName==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명='"+tablename+"' and 대표_결합키='"+key+"';";
    else if(tablename==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 대표_결합키='"+key+"' and 대표_속성='"+att;
    else if(key==0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 테이블_명='"+tablename+"' and 대표_속성='"+att;
    else if(att=0)
        var sql = "SELECT * FROM scantable WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 테이블_명='"+tablename+"' and 대표_결합키='"+key;
    else if(attName==0)
        var sql = "SELECT * FROM scantable WHERE 대표_속성='"+att+"' and 테이블_명='"+tablename+"' and 대표_결합키='"+key;
    else
        var sql = "select * from scantable";
    return sql;
}

module.exports = search;