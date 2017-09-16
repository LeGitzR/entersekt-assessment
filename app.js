const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];
let editVal = "";

/* The to do list and the form are displayed */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', { todolist, clickHandler:"func1();", editVal });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        todolist.push(req.body.newtodo);
        editVal = "";
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Edits an item from the to do list by removing it from the todolist array
   and placing the value in the text box to be edited and added again */
.get('/todo/edit/:id', function(req, res) {
    if (req.params.id != '') {
        editVal = todolist[req.params.id];
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);
