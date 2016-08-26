var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/minepm');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

db.once('open',funtion(){
	 console.log("Database connection successful...");
 });

