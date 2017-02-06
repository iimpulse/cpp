"use strict";
var express        = require('express');
var app            = express();
//var bodyParser     = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs'),readline=require('readline');

class Result{

			constructor(){
				this.bc = [];
				this.lung = [];
				this.prostate = [];
				this.colon =[];
				this.pancreatic = [];
			}
}


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
		var cancers = JSON.parse(req.query.all);
		cancers.bcid = cancers.bcid.split(",");
		cancers.pcid = cancers.pcid.split(",");
		cancers.ccid = cancers.ccid.split(",");
		cancers.lcid = cancers.lcid.split(",");
		cancers.pncid = cancers.pncid.split(",");
		var results = new Result();
		// do callbacks get all articles queried by ids from gene
		var reg = new RegExp("^" + req.query.q);
				db.collection("bladdercancer").find({"pmid":{$in:cancers.bcid}}).toArray(function(err,data){
					if(err){
						return null;
					}
					else{
						db.collection("prostatecancer").find({"pmid":{$in:cancers.pcid}}).toArray(function(err,data){
							if(err){
								return null;
							}
							else{
								db.collection("coloncancer").find({"pmid":{$in:cancers.ccid}}).toArray(function(err,data){
									if(err){
										return null;
									}
									else{
										db.collection("lungcancer").find({"pmid":{$in:cancers.lcid}}).toArray(function(err,data){
											if(err){
													return null;
												}
												else{
														db.collection("pancreaticcancer").find({"pmid":{$in:cancers.pncid}}).toArray(function(err,data){
															if(err){
																return null;
															}
															else{
																results.pancreatic = data;
																res.send(results);
															}

														});
													results.lung = data;
												}

											});

										results.colon = data;
									}

								});
								results.prostate = data;
							}

						});
						results.bc = data;
						
					}

				});
				
				
		/*var quer = req.query.cancer;
		var collection = null;
		var articles = [];
		var cancers = ["bladder.json","lung.json","prostate.json","colon.json","pancreatic.json"];
		var file= "";
		for(var i = 0; i < cancers.length; i++){
			file = require("./src/assets/json/" + cancers[i]);
			articles.push(file);
		}
		console.log(articles.length);
		
		res.send(articles);	*/
		 
	});

app.get("/data/symbols",function(req,res){
	var reg = new RegExp("^" + req.query.q);
	db.collection("genes").find({"gene":{$regex: reg }}).toArray(function(err,data){
		if(err){

			throw err;
		}
		else{
			data.sort(function(a,b){
			if (a.gene < b.gene)
			    return -1;
			  if (a.gene > b.gene)
			    return 1;
			  return 0;
			})
			res.send(data);
		}
	
	});
	/*var rd = readline.createInterface({
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
	});	*/
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
