var mongoose = require("mongoose");
mongoose.set("debug", true)

mongoose.connect("mongodb://localhost/todo-api",{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log("connected to DB..!"))
.catch( err=> console.log(err.message))


mongoose.Promise = Promise;

module.exports.Todo = require("./todo")