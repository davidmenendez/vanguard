var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var app = express();

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.post('/api/user', (req, res) => {
  res.send('user created');
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(8000, () => {
    console.log('listening on 8000');
});