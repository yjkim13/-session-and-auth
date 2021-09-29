const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser')
const compression = require('compression')
const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',function(request,response,next){
  fs.readdir('./data',(error, filelist)=>{
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter)
app.use('/topic', topicRouter)


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})