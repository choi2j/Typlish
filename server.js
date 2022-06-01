const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/svg', express.static('svg'));

app.listen('7070', () => {
    console.log('listening on 7070');
});

// var db;

// MongoClient.connect('mongodb+srv://choi2j:1234@cluster0.qjbln.mongodb.net/todoApp?retryWrites=true&w=majority', function(err, client) {
//     if (err) return console.log(err);

//     db = client.db('todoapp');

//     app.listen('8080', () => {
//         console.log('listening on 8080');
//     });
// })

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/home', (req, res) => {
    res.render('home.ejs');
});

app.get('/mypage', (req, res) => {
    res.render('mypage.ejs');
});

app.get('/paragraph', (req, res) => {
    res.render('paragraph.ejs');
});

app.get('/typing', (req, res) => {
    res.render('typing.ejs');
});