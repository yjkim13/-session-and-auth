var express = require('express');
var router = express.Router();
const template = require('../lib/template.js');

//route, routing
router.get('/', (request, response) => {
    var title = `Welcome`
    var description = 'Hello, Node.js'
    var list = template.list(request.list);
    var html = template.HTML(title,list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin:10px;">
      `,
      `<a href="/topic/create">Create</a>`
    );
    response.send(html);
  });

  module.exports = router;