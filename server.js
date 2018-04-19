process.env.TZ = 'Asia/Taipei' 
// Get the packages we need
var express = require('express');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var readersController = require('./controllers/readers');
var tagsController = require('./controllers/tags');
var tagaaController = require('./controllers/tagaa');
var tagPositionController = require('./controllers/tag_position');
var loadTestController = require('./controllers/loadtest');
var tagstateController = require('./controllers/tagstate');
var time_linesController = require('./controllers/time_lines');
var time_lines_todayController = require('./controllers/time_lines_today');
var testanimalController = require('./controllers/testanimal');
var time_lines_animalController = require('./controllers/time_lines_animal');
var time_animal_stateController = require('./controllers/tag_animal_state');
var tag_animal_positionController = require('./controllers/tag_animal_position');
var tag_socketController = require('./controllers/tagsocket');
var tag_nameController = require('./controllers/tag_name');
var tag_dateController = require('./controllers/tag_date');
var tag_uidsearchController = require('./controllers/tag_uidsearch');
var statedataController=  require('./controllers/statedata');
var stateresetController = require('./controllers/statereset');
var aaaController = require('./controllers/aaa');

var collecteddataController = require('./controllers/collecteddata');

var collecteddatatestController = require('./controllers/collecteddatatest');
var collectestrengthController = require('./controllers/collectestrength');
var duringController = require('./controllers/during');
var duringTestController = require('./controllers/duringtest');

var Time_lineInstance= require('./models/time_lines'); 
var Time_lines_animalInstance = ('./models/time_line_animal'); 
var departmentTagsController = require('./controllers/departmentTags');
var demoReadersController = require('./controllers/demoReaders');


var session = require('express-session');
var passport = require('passport');
var path = require('path');
var mime = require('mime');
//file upload
var multer  = require('multer');
var upload = multer();
var done=false; 
var app = express();
app.set('http_port', 9004);
//app.set('ip', "localhost");

app.set('ip', "10.1.1.77");
//app.set('ip', "1.163.240.170");
//app.set('ip', "127.0.0.1");

//handle for jsonp
app.set("jsonp callback", true);
// http
var http = require('http');
var httpServer = http.createServer(app);
var aaa =0;
var ss=require("socket.io");
var io = ss.listen(httpServer);
var fs = require('fs');
//io.set('transports', ['Long polling', 'websocket']);
app.use("/registration/v1/img",express.static(__dirname + "/public/img"));


//handle for jsonp
app.set("jsonp callback", true);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(session({
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.session());

app.set("views", __dirname + "/views");
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');





app.use("/2.4/v1",express.static("public", __dirname + "/public"));
app.all("/2.4/v1/index", function(request, response) {
	response.render('index');


});
app.all("/2.4/v1/tag", function(request, response) {
	response.render('tag');


});

app.post('/123', function(req, res) {
	
	var aaa =upload.array();
	aaa(req, res, function(err) {
	var ss=req.body.toString().split("\r\n");
		console.log("ss"+ss.length);
		console.log("reqfile"+req.body.toString());
		console.log("reqfile"+req.file);
		console.log("reqfile"+req.files);
		return res.json(req.body);
		
	})
	console.log("reqfile"+req.body);
})

app.all("/2.4/v1/animal", function(request, response) {
	response.render('animaldemo');


});

app.all("/2.4/v1/floorplan", function(request, response) {
	response.render('floorplan');


});

app.all("/2.4/v1/map", function(request, response) {
	response.render('map');


});

app.all("/2.4/v1/floorplantest", function(request, response) {
	response.render('floorplantest');


});

app.all("/2.4/v1/department", function(request, response) {
	response.render('department_tag');


});

app.all("/2.4/v1/et1.1", function(request, response) {
	response.render('testanimal');


});

app.all("/2.4/v1/tagadmin", function(request, response) {
	response.render('tagadmin');


});
app.all("/2.4/v1/tagtest", function(request, response) {
	response.render('tagtest');


});
app.all("/2.4/v1/chart", function(request, response) {
	response.render('d3');


});
app.all("/2.4/v1/ccc", function(request, response) {
	response.render('testd3');


});

app.all("/2.4/v1/ccs", function(request, response) {
	response.render('showstrength');


});


app.all("/2.4/v1/format", function(request, response) {
	response.render('format');


});


// 畜牧demo channel
/*app.all("/2.4/v1/demochannel", function(request, response) {
	var reader_name = request.body.reader_name;
	var position = request.body.position;
	var tag_name = request.body.tag_name;
	var tag_uid = request.body.tag_uid;
	var strength = request.body.strength;
	var wrong_packet = request.body.wrong_packet;
	var created_at = new Date();
	var time_lineInstance = new Time_lineInstance();		
	console.log("reader_name:"+reader_name);
	// console.log("position:"+position);
	// console.log("tag_name:"+tag_name);
	console.log("tag_uid:"+tag_uid);
	// console.log("strength:"+strength);
	
	
	var sql = "select * from tag where tag_uid = '"+tag_uid+"'";
	console.log(sql);
	time_lineInstance.query(sql,function(err,rows,fields){
		if(err) 
		{
			customErr.status = 503;
			customErr.message = "db query error";	
			console.log("db query error");
			next(customErr);			
				
		}
		else
		{
			console.log("----emit block");
			var time_line_record = {};
			if(typeof rows[0] !== "undefined")
			{
				time_line_record.tag_name = rows[0].tag_name;
				time_line_record.tag_id = rows[0].id;
			}
			else
			{
				time_line_record.tag_name = "";
				time_line_record.tag_id = "";
			}
			
	

			
			sql = "select position from reader where reader_name = '"+reader_name+"'";
			console.log(sql);
			time_lineInstance.query(sql,function(err,rows,fields){
				if(err) 
				{
					customErr.status = 503;
					customErr.message = "db query error";	
					console.log("db query error");
					next(customErr);			
						
				}
				else
				{
					if(rows.length > 0)
					{
						time_line_record.reader_name = reader_name;
						time_line_record.tag_uid = tag_uid;
						time_line_record.strength = strength;
						time_line_record.created_at = created_at;
						
						time_line_record.wrong_packet = wrong_packet;
						time_line_record.position = rows[0].position;
						io.sockets.emit("demochannel", time_line_record);
													
					
					}
					else
					{
						response.send("message send");	
					
					}
	
				

				}
				
							

			});		
		
		

		}
		
					

	});
	
	
	


	
});*/
var time_line_record1 = {};
var time_line_record = {};
//setInterval(function(){
				/*$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/tag_socket"
					})
					.success(function(msg) {
						//alert(JSON.stringify(msg));
						// console.log("tag id:"+JSON.stringify(msg.response[0].position));
						console.log("最後更新時間："+JSON.stringify(msg));
						console.log("msg:"+msg);
						resData=msg.response;
						var time_line_record = {};
				time_line_record.tag_uid = resData.tag_uid;
				time_line_record.reader_name = resData.reader_name;
				time_line_record.create_at = resData.create_at;
					time_line_record.state=resData.state;

				console.log('here'+time_line_record);
				io.sockets.emit("channel2", time_line_record);
					
						

					})*/
					
				/*	var time_lineInstance = new Time_lineInstance();
					var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;	
	console.log("getTagPosition---");
	var concatenate = errorMessages.join(", ");
	customErr.message = concatenate;	


	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
	
		var interval = 5;
		var sql = 
		"SELECT distinct tag_animal.id,tag_animal.tag_uid,reader_name,create_at,state FROM time_line_animal,tag_animal WHERE  time_line_animal.tag_uid=tag_animal.tag_uid";
		
		
		//console.log("sql:"+sql);
		time_lineInstance.query(sql,function(err, rows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));

				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				io.sockets.emit("channel2", rows);	
			}
		});



	}
		

},1000*5);*/



app.all("/2.4/v1/channelapp", function(request, response) {
	console.log("QQQQQQQQQQQQQQQQQQQQQQQQQ");
	var reader_name = request.body.reader_name;
	//var position = request.body.position;
	//var tag_name = request.body.tag_name;
	var tag_uid = request.body.tag_uid;
	//var tag_state = request.body.tag_state;
	//var strength = request.body.strength;
	//var wrong_packet = request.body.wrong_packet;
	var created_at = request.body.created_at;
	var time_lineInstance = new Time_lineInstance();
	if(tag_uid!=='無')
	{
	console.log("reader_name:"+reader_name);
	// console.log("position:"+position);
	// console.log("tag_name:"+tag_name);
	console.log("tag_uid:"+tag_uid);
	// console.log("strength:"+strength);
	aaa=aaa+1;
	console.log(aaa);
	//var sql = "select tag_name from tag where tag_uid = '"+tag_uid+"'";
	console.log(sql);
	/*time_lineInstance.query(sql,function(err,rows,fields){
		if(err) 
		{
			customErr.status = 503;
			customErr.message = "db query error";	
			console.log("db query error");
			next(customErr);			
				
		}
		else
		{
			console.log("----emit block");
			var time_line_record = {};
			if(typeof rows[0] !== "undefined")
			{
				time_line_record.tag_name = rows[0].tag_name;
			
			}
			else
			{
				time_line_record.tag_name = "";
			}
			
	

			
			//sql = "select position from reader where reader_name = '"+reader_name+"'";
			//console.log(sql);
			time_lineInstance.query(sql,function(err,rows,fields){
				if(err) 
				{
					customErr.status = 503;
					customErr.message = "db query error";	
					console.log("db query error");
					next(customErr);			
						
				}
				else
				{
					if(rows.length > 0)
					{*/
						time_line_record1.reader_name = reader_name;
						time_line_record1.tag_uid = tag_uid;
						//time_line_record.strength = strength;
						time_line_record1.created_at = created_at;
						//time_line_record.tag_state = tag_state;
						//time_line_record.wrong_packet = wrong_packet;
						//time_line_record.position = rows[0].position;
						
						
						io.sockets.emit("channel2", time_line_record1);
						response.send("message send");	
				/*
					}
					else
					{
						response.send("message send");	
					
					}
	
				

				}
				
							

			});		
		
		

		}
		
					

	});*/
	
	}
	


	
});

app.all("/2.4/v1/TagData", function(request, response) {

 var apiOutput = {};
				apiOutput.status = "success";
				apiOutput.message = "TAG found";
				apiOutput.response = time_line_record;			
				response.json(apiOutput);


});


app.all("/2.4/v1/channel", function(request, response) {
	var reader_name = request.body.reader_name;
	var position = request.body.position;
	var tag_name = request.body.tag_name;
	var tag_uid = request.body.tag_uid;
	var tag_state = request.body.tag_state;
	var strength = request.body.strength;
	var wrong_packet = request.body.wrong_packet;
	var created_at = new Date();
	var time_lineInstance = new Time_lineInstance();
	if(tag_uid!=='無')
	{
	console.log("reader_name:"+reader_name);
	// console.log("position:"+position);
	// console.log("tag_name:"+tag_name);
	console.log("tag_uid:"+tag_uid);
	// console.log("strength:"+strength);
	aaa=aaa+1;
	console.log(aaa);
	
	var sql = "select tag_name,state from tag where tag_uid = '"+tag_uid+"'";
	console.log(sql);
	time_lineInstance.query(sql,function(err,rows,fields){
		if(err) 
		{
			customErr.status = 503;
			customErr.message = "db query error";	
			console.log("db query error");
			next(customErr);			
				
		}
		else
		{
			console.log("----emit block");
			//var time_line_record = {};
			if(typeof rows[0] !== "undefined")
			{
				time_line_record.tag_name = rows[0].tag_name;
				if(rows[0].state===1){
				     console.log(rows[0].state);
					var state = '開啟';
				
				}else{
				console.log(rows[0].state);
					var state = '關閉';
				}
				time_line_record.tag_state = state;
				console.log(time_line_record.tag_state);
			}
			else
			{
				time_line_record.tag_name = "未命名";
				time_line_record.tag_state = "";
			}
			
	

			
			sql = "select position from reader where reader_name = '"+reader_name+"'";
			console.log(sql);
			time_lineInstance.query(sql,function(err,rows,fields){
				if(err) 
				{
					customErr.status = 503;
					customErr.message = "db query error";	
					console.log("db query error");
					next(customErr);			
						
				}
				else
				{
					if(rows.length > 0)
					{
						time_line_record.reader_name = reader_name;
						time_line_record.tag_uid = tag_uid;
						time_line_record.strength = strength;
						time_line_record.created_at = created_at;
						time_line_record.wrong_packet = wrong_packet;
						time_line_record.position = rows[0].position;
						io.sockets.emit("channel1", time_line_record);
						var apiOutput = {};
						apiOutput.status = "success";
						apiOutput.message = "SOCKET UPDATE";
						apiOutput.response = time_line_record;	
						response.json(apiOutput);
						
				
					}
					else
					{
						response.send("message send");	
					
					}
	
				

				}
				
							

			});		
		
		

		}
		
					

	});
	
	}
});
var routerRegistration = express.Router();
app.use('/2.4/v1', routerRegistration);

routerRegistration.route('/readers')
	.get(readersController.getReaders)
	.post(readersController.postReaders);

	
	
	
routerRegistration.route('/tag_state')
	.post(tagstateController.postFindTagState);	
	
routerRegistration.route('/tags')
	.get(tagsController.getTags);
	
	
routerRegistration.route('/tagaa')
	.get(tagaaController.getTags);
	
routerRegistration.route('/testanimal')
	.post(testanimalController.gettestanimal);	

routerRegistration.route('/time_line_animal')
	.post(time_lines_animalController.posttime_line_animal);	
	
	
routerRegistration.route('/department/tags')
	.get(departmentTagsController.getDepartmentTags);	
	
	
	
	
routerRegistration.route('/tag_position')
	.post(tagPositionController.postFindTagPosition);
	
routerRegistration.route('/time_lines')	
	.post(time_linesController.posttime_lines);
	
routerRegistration.route('/tag_animal_state')	
	.post(time_animal_stateController.getTagState);	
	
routerRegistration.route('/tag_animal_position')	
	.post(tag_animal_positionController.postFindTagPosition);		
	
routerRegistration.route('/tag_socket')	
	.post(tag_socketController.postFindTagPosition);		

routerRegistration.route('/tag_name')	
	.post(tag_nameController.getTags);	

routerRegistration.route('/tag_date')	
	.post(tag_dateController.getTags);	
	
routerRegistration.route('/tag_uidsearch')	
	.post(tag_uidsearchController.getTags);	
	
routerRegistration.route('/statedata')	
	.post(statedataController.getTags);

routerRegistration.route('/statereset')	
	.post(stateresetController.getTags);		
	
routerRegistration.route('/aaa')	
	.post(aaaController.getTags);	
	
routerRegistration.route('/time_lines_today')	
	.post(time_lines_todayController.posttime_lines_today);	
	
	
routerRegistration.route('/collecteddata')	
	.post(collecteddataController.getCollectedData);

routerRegistration.route('/collecteddatatest')	
	.post(collecteddatatestController.getCollectedData);		
	
routerRegistration.route('/collectestrength')	
	.post(collectestrengthController.getCollectedData);		
	
	
routerRegistration.route('/during')	
	.post(duringController.postDuring);		
routerRegistration.route('/loadtest')
	.post(loadTestController.postloadtest);			
	
routerRegistration.route('/duringtest')	
	.post(duringTestController.postDuring);		
	
routerRegistration.route('/demoreaders')	
	.get(demoReadersController.getDemoReaders);		
	
	
	
// Error Hanlding
app.use(function(err, req, res, next) {
	var apiOutput = {};
	apiOutput.status = "failure";
	apiOutput.error_message = err.message;
	
	if(typeof err.gcm_user_id !== "undefined")apiOutput.gcm_user_id = err.gcm_user_id;
	if(typeof err.status !== "undefined")res.statusCode = err.status;	

	res.send(JSON.stringify(apiOutput) || '** no relevant error handle **');  
	
	
	
	return next();
}); 
httpServer.listen(app.get('http_port'),app.get('ip'),function(){
	console.log("listen on port "+app.get('http_port')+", server is running");


});


