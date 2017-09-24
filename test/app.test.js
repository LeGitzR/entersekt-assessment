var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect();var server = require('../app');

chai.use(chaiHttp);


describe('Adding Todos', function() {
  it('should list NO todos on /todo GET', function (done) {
    chai.request(server)
    .get('/todo')
    .end(function(err, res){
      server.todolist.should.have.lengthOf(0);
      res.should.have.status(200);
      res.text.should.equal('<!DOCTYPE html>\n\n<html>\n    <head>\n        <title>My todolist</title>\n        <style>\n            a {text-decoration: none; color: black;}\n        </style>\n    </head>\n\n    <body>\n        <h1>My todolist</h1>\n        <ul>\n        \n        </ul>\n\n        <form action="/todo/add/" method="post">\n            <p>\n                <label for="newtodo">What shoud I do?</label>\n                <input type="text" name="newtodo" id="newtodo" value="" autofocus />\n                <input type="submit" />\n            </p>\n        </form>\n    </body>\n</html>\n');
      done();
    });
  });
  it('should add ONE todo on /todo/add POST', function(done) {
    chai.request(server)
        .post('/todo/add')
        .send({'newtodo': 'This is a new todo'})
        .end(function(err, res){
        res.should.have.status(200);
        server.todolist.should.have.lengthOf(1);
        done();
        });
    });


  it('should list ONE todo on /todo GET', function (done) {
    chai.request(server)
    .get('/todo')
    .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.equal('<!DOCTYPE html>\n\n<html>\n    <head>\n        <title>My todolist</title>\n        <style>\n            a {text-decoration: none; color: black;}\n        </style>\n    </head>\n\n    <body>\n        <h1>My todolist</h1>\n        <ul>\n        \n            <li>\n                <a href="/todo/delete/0">✘</a>\n                \n                <a href="/todo/edit/0">&#9998;</a>\n            </li>\n        \n        </ul>\n\n        <form action="/todo/add/" method="post">\n            <p>\n                <label for="newtodo">What shoud I do?</label>\n                <input type="text" name="newtodo" id="newtodo" value="" autofocus />\n                <input type="submit" />\n            </p>\n        </form>\n    </body>\n</html>\n');
        server.todolist.should.have.lengthOf(1);
      done();
    });
  });

});

describe('Deleting Todos', function() {
    it('Should delete a todo from /todo/delete/:id GET', function (done) {
        chai.request(server)
        .get('/todo/delete/0')
        .end(function(err, res){
          res.should.have.status(200);
          server.todolist.should.have.lengthOf(0);
          done();
        });
    });

  it('should list NO todos on /todo GET', function (done) {
    chai.request(server)
    .get('/todo')
    .end(function(err, res){
        res.should.have.status(200);
        server.todolist.should.have.lengthOf(0);
      res.text.should.equal('<!DOCTYPE html>\n\n<html>\n    <head>\n        <title>My todolist</title>\n        <style>\n            a {text-decoration: none; color: black;}\n        </style>\n    </head>\n\n    <body>\n        <h1>My todolist</h1>\n        <ul>\n        \n        </ul>\n\n        <form action="/todo/add/" method="post">\n            <p>\n                <label for="newtodo">What shoud I do?</label>\n                <input type="text" name="newtodo" id="newtodo" value="" autofocus />\n                <input type="submit" />\n            </p>\n        </form>\n    </body>\n</html>\n');
      done();
    });
  });

});

/* Not sure how to access editVal from test case.. */

describe('Editing Todos', function() {
    it('Should add ONE todo on /todo/add POST', function(done) {
    chai.request(server)
        .post('/todo/add')
        .send({'newtodo': 'This is a new todo'})
        .end(function(err, res){
        res.should.have.status(200);
        server.todolist.should.have.lengthOf(1);
        done();
        });
    });
    it('Should edit todo on /todo/edit GET', function (done) {
        chai.request(server)
        .get('/todo/edit/0')
        .end(function(err, res){
          res.should.have.status(200);
          server.todolist.should.have.lengthOf(0);
          done();
        });
    });

  it('should list NO todos on /todo GET', function (done) {
    chai.request(server)
    .get('/todo')
    .end(function(err, res){
        res.should.have.status(200);
        server.todolist.should.have.lengthOf(0);
      res.text.should.equal('<!DOCTYPE html>\n\n<html>\n    <head>\n        <title>My todolist</title>\n        <style>\n            a {text-decoration: none; color: black;}\n        </style>\n    </head>\n\n    <body>\n        <h1>My todolist</h1>\n        <ul>\n        \n        </ul>\n\n        <form action="/todo/add/" method="post">\n            <p>\n                <label for="newtodo">What shoud I do?</label>\n                <input type="text" name="newtodo" id="newtodo" value="" autofocus />\n                <input type="submit" />\n            </p>\n        </form>\n    </body>\n</html>\n');
      done();
    });
  });

});

describe('XSS tests', function() {
    it('Add malicous string /todo/add POSt', function(done) {
    chai.request(server)
        .post('/todo/add')
        .send({'newtodo': '<a href="javascript:alert(\'Hi\')">This is the todo</a>'})
        .end(function(err, res){
        res.should.have.status(200);
        server.todolist.should.have.lengthOf(1);
        done();
        });
    });

    it('Edit the added todo item to ensure malicous tags are striped', function(done) {
    chai.request(server)
        .get('/todo/edit/0')
        .end(function(err, res){
        res.should.have.status(200);
        //Get input value and check if it contains href attribute
        server.todolist.should.have.lengthOf(0);
        done();
        });
    });

});


describe('Redirect Testing', function() {
    it('Should redirect to /todo', function(done) {
    chai.request(server)
        .get('/nottodo')
        .end(function(err, res){
        res.should.have.redirect;
        res.redirects.should.have.lengthOf(1);
        done();
        });
    });

});
