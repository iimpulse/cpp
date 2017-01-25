var express        = require('express');
var app            = express();
//var bodyParser     = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs'),readline=require('readline');


/**app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
**/
app.use(express.static(__dirname + '/'));
// Get LESS.js app.use(require("less-middleware"));

//Define database connection and schemas
mongoose.connect('mongodb://localhost/minepm');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log("Database connection successful...");
});


//var Gene = new mongoose.model('genes',geneSchema);

app.post("/data/symbol",function(req,res){
		var quer = req.query.gene;
		db.collection("genes").find({"gene":quer}).toArray(function(err,data){
		if(err){

			throw err;
		}

		else{
			data[0].bcid = isna(data[0].bcid.split(","));
			data[0].lcid = isna(data[0].lcid.split(","));
			data[0].pcid = isna(data[0].pcid.split(","));
			data[0].ccid = isna(data[0].ccid.split(","));
			data[0].pncid = isna(data[0].pncid.split(","));
			res.send(data);
		}
	
	});		
});
app.post("/data/articles",function(req,res){
		var quer = req.query.cancer;
		var collection = null;
		switch(quer){
			case "bladder":
				path = "./src/assets/json/bladder.json";
				break;
			case "lung":
				path = "./src/assets/json/lung.json";
				break;

			case "prostate":
				path = "./src/assets/json/prostate.json";
				break;
		
			case "colon":
				path = "./src/assets/json/colon.json";
				break;
			case "pancreatic":
				path = "./src/assets/json/pancreatic.json";
				break;
		}
		
		 var file = require(path);
		 res.json(file);		
		 
	});




app.get("/data/symbols",function(req,res){
	var rd = readline.createInterface({
		input:fs.createReadStream('src/assets/genes2.txt'),
		terminal:false

	});
	
	var genes = []
	var count = 0;
	rd.on('line',function(line){
		var lin = line.split("\t");
		if(count == 0){
			count++;
		}
		else{
			genes.push(lin[0])
		}
	 });
	
	rd.on('close',function(){
		res.send(genes);	
	});		
});

function isna(data){
		if(data[0] == "NA"){

				return "";

		}
		else{

				return data;
		}
}


var port = process.env.PORT || 8081;
app.listen(port);
// shoutout to the user                     
console.log('Magic happens on port ' + port);
// expose app           
exports = module.exports = app;
