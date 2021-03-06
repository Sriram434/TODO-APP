var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'))

app.get("/", function(req,res){
	res.render("index.html")
})

app.use("/api/todos", todoRoutes)




app.listen(process.env.port || 3000, process.env.IP, function(){
	console.log("server started")
})