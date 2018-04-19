var mysqlModel = require('mysql-model');
var MyAppModel = mysqlModel.createConnection({
  host     : '10.1.1.77',
  user     : 'root',
  agent	   :false,
  password : 'ruixinihoin',
  database : '2.4_husbandry',
  port:'3306'
});
var Client = MyAppModel.extend({
    tableName: "time_line",
});
module.exports = Client;
// 引用MySQL函式庫
/*var mysql = require('mysql');
// 建立資料庫連線池
var pool  = mysql.createPool({
    host     : '10.1.1.77',
  user     : 'root',
  password : 'ruixinihoin',
  database : '2.4_test',
  port:'3306'
});
	//console.log('ssssssssssssss');
			pool.query( 'select * from time_line', function(error, results,fields) {
			console.log('time_line');
            // 使用連線查詢完資料
			//console.log(results);
			module.exports = results;
            // 釋放連線
            //connection.release();
            // 不要再使用釋放過後的連線了，這個連線會被放到連線池中，供下一個使用者使用
        });*/

