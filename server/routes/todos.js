var express = require('express'),
	bodyParser = require("body-parser"),
	helpers = require("../helpers/todo");
var router= express.Router();
var db = require("../models")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route("/")
	.get(helpers.getTodos)
	.post(helpers.postTodos)

router.route("/:todoId")
	.get(helpers.showTodos)
	.put(helpers.updateTodos)
	.delete(helpers.deleteTodos)


module.exports = router;