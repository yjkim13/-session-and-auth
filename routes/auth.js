var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');
const session = require('express-session');


var authData = {
  email:'hobbit09@gmail.com',
  password:'111111',
  nickname:'kimew'
}

router.get('/login', (request, response) => {
  var title = `WEB - login`
  var list = template.list(request.list);
  var html = template.HTML(title,list,`
    <form action="/auth/login_process" method="post">
    <p><input type="text" name="email" placeholder="email"></p>
    <p>
    <input type="password" name="pwd" placeholder="password"></p>
    <p>
      <input type="submit" value="login">
    </p>
    </form>
    `, '');
  response.send(html);
});

router.post('/login_process',(request, response)=>{
  var post = request.body;
     var email = post.email;
     var password = post.pwd;
     if(email === authData.email && password === authData.password){
      request.session.is_logined = true;
      request.session.nickname = authData.nickname;
      response.redirect(`/`);
     }else{
       response.send('Who?');
     }
 });

 router.get('/logout', (request, response) => {
  request.session.destroy(function(err){
    response.redirect('/');
  })
});
/*
//페이지 생성 구현
router.get('/create', (request, response) => {
    var title = `WEB - Create`
    var list = template.list(request.list);
    var html = template.HTML(title,list,`
      <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description"  placeholder="description"></textarea>
      <p>
        <input type="submit">
      </p>
      </form>
      `, '');
    response.send(html);
  });
  
  //페이지 생성 전달
  router.post('/create_process',(request, response)=>{
    var post = request.body;
       var title = post.title;
       var description = post.description;
       fs.writeFile(`data/${title}`, description, 'utf8',(err)=>{
         response.redirect(`/topic/${title}`);
         response.end();
       })
   });
  
   //페이지 수정 구현
   router.get('/update/:topicId', (request, response) => {
    var filteredId = path.parse(request.params.topicId).base
    fs.readFile(`data/${filteredId}`,`utf8`,function(err,description){
      var title = request.params.topicId;
      var list = template.list(request.list);
      var html =template.HTML(title,list,
        `<form action="/topic/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description"  placeholder="description">${description}</textarea>
        <p>
          <input type="submit">
        </p>
        </form>
        `,
        `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`);
      response.send(html);
    });
  });
  
  //페이지 수정 전달
  router.post('/update_process',(request, response)=>{
    var post = request.body
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`,`data/${title}`,(error)=>{
      fs.writeFile(`data/${title}`, description, 'utf8',(error)=>{
        response.redirect(`/topic/${title}`);
      })
    });
  });
  
    //페이지 삭제 구현
    router.post('/delete_process',(request, response)=>{
    var post = request.body
    var id = post.id;
    var filteredId = path.parse(id).base
    fs.unlink(`data/${filteredId}`, (err)=>{
      response.redirect('/');
    })
  });
  
  
  //상세 페이지 구현
  router.get('/:topicId', (request, response,next) => {
    var filteredId = path.parse(request.params.topicId).base
    fs.readFile(`data/${filteredId}`,`utf8`, function(error,description){
      if(error){
        next(error);
      } else {
        var title = request.params.topicId;
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
          allowedTags: ['h1']
        });
        var list = template.list(request.list);
        var html =template.HTML(sanitizedTitle,list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/topic/create">Create</a><br>
            <a href="/topic/update/${sanitizedTitle}">Update</a><br>
            <form action="/topic/delete_process" method="post">
              <input type="hidden" name = "id" value="${sanitizedTitle}">
              <input type="submit" value="Delete">
            </form>`
        );
        response.send(html);
      }
    });
  });
  */
  module.exports = router;