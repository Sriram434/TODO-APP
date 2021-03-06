$(document).ready(function(){
	$.getJSON("/api/todos")  //Get the data from /api/todos
	.then(addTodos)  //Adding the elements in a loop
	
	$("#todoInput").keypress(function(event){ //posting the data from form
		if(event.which == 13){
			createTodo();
		}
	})
	
	$('.list').on('click','li', function(){
		updateTodo($(this))
	} )
	
	$('.list').on('click', 'span', function(i){
		i.stopPropagation() //Used to stop mismatch with other function while clicking
		removeTodo($(this).parent())
		
	})
})

//Looping the elements in a <li>'s
function addTodos(todos){
	todos.forEach(function(todo){
		addTodo(todo)
	})
}

//Post new data in the form ("post request")
function createTodo(){
	var usrinput = $('#todoInput').val(); //getting the input from the user / form
	
	$.post('/api/todos', {name:usrinput}) //post request user input to <li>'s
	.then(function(newTodo){
		var usrinput = $('#todoInput').val('') 
		addTodo(newTodo)
	})
	.catch(function(err){
		console.log(err)
	})
}

function addTodo(todo){
	var newTodo = $('<li class="task">' + todo.name + '<span> X </span> </li>')
	newTodo.data('id', todo._id ) //Method to get ._id from the i/p / DB
	newTodo.data('completed', todo.completed)
	if(todo.completed){
		newTodo.addClass("done")
	}
	$('.list').append(newTodo)
}

function removeTodo(todo){
var clickedId = todo.data('id')	
	$.ajax({
		method: 'DELETE',
		url: '/api/todos/' + clickedId 
	})
	.then(function(data){
		todo.remove()
	})
	.catch(function(err){
		console.log(err)
	})
}

function updateTodo(todo){
	var isDone = !todo.data('completed')
	var updateData = {completed: isDone}
	$.ajax({
		method: 'PUT',
		url: '/api/todos/' + todo.data('id'),
		data: updateData
	})
	
	.then(function(updateData){
		todo.toggleClass("done")
		todo.data("completed", isDone)
	})
}
