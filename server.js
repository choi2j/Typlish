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
app.use('/js', express.static('js'));

// var db;

// MongoClient.connect('mongodb+srv://admin:1234@cluster0.ch8xt.mongodb.net/typlish?retryWrites=true&w=majority', function(err, client) {
//     if (err) return console.log(err);

//     db = client.db('typlish');

//     app.listen('7070', () => {
//         console.log('listening on 7070');
//     });
// });


app.listen('7070', () => {
    console.log('listening on 7070');
});

// 로그인
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});


// 로그인 우저 전용 창
app.get('/home', (req, res) => {
    res.render('home.ejs');
});

app.get('/paragraph', (req, res) => {
    res.render('paragraph.ejs');
});

app.get('/typing', (req, res) => {
    res.render('typing.ejs');
});


// app.get('/paragraph/:id', (req, res) => {
//     db.collection('paragraphList').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
//         console.log(result);
//         res.render('paragraph.ejs', { paragraphList: result });
//     });
// });

// app.get('/typing/:id', (req, res) => {
//     db.collection('paragraph').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
//         console.log(result);
//         res.render('typing.ejs', { paragraphList: result });
//     });
// });

// app.post('/typing', (req, res) => {
//     res.send('전송완료');
//     db.collection('paragraphList').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
//         console.log(result.paragraphList);
//         var postSum = result.paragraphList;
//     });
// });


// 필요한 데이터 베이스
// paragraphList : paragraphId, paragraphTitle, paragraphDate
// userData : email, password, typingRecord

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());