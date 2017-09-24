const express = require('express');
const bodyParser = require('body-parser');
const sanitizer = require('sanitizer');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];
let editVal = "";

/* The to do list and the form are displayed */
/* clickHandler:"func1();" whats is this for ? */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', { todolist: todolist, editVal: editVal });
})

/* The tests are run and the results are diplayed */
.get('/test', function(req, res) {
    res.render('tests.ejs');
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    var newtodo = req.body.newtodo;
    newtodo = sanitizer.sanitize(newtodo);
    if (newtodo != '') {
        todolist.push(newtodo);
        editVal = "";
    }
    app.set('todolist', todolist);
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    app.set('todolist', todolist);
    res.redirect('/todo');
})

/* Edits an item from the to do list by removing it from the todolist array
   and placing the value in the text box to be edited and added again */
.get('/todo/edit/:id', function(req, res) {
    if (req.params.id != '') {
        editVal = todolist[req.params.id];
        todolist.splice(req.params.id, 1)
    }
    app.set('todolist', todolist);
    res.redirect('/todo');
})


/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);

module.exports = app;
module.exports.todolist = todolist;
