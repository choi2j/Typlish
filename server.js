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
app.use('/img', express.static('img'));
var db;
MongoClient.connect('mongodb+srv://complish:1128@cluster0.s6glp.mongodb.net/post?retryWrites=true&w=majority',function(에러,client){
    if(에러) return console.log(에러)
    db = client.db('todoapp');
    // db.collection('post').insertOne({이름:'John'},function(에러,결과){
    //     console.log('저장완료');
    // });
    app.listen(8080,function(){
        console.log('hello worlds');
    });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register.ejs',{show:''});
});

app.post

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

app.post('/register',(req,res) => {
    db.collection('login').findOne({id:req.body.id},function(에러,결과){
        if (!결과){
            console.log('아이디없당')
            db.collection('login').insertOne({id:req.body.id,pw:req.body.pw},function(에러,결과){
                res.redirect('/home')
                console.log('회원등록완료')
            })
        }else{
            res.render('register.ejs',{show:'show'})
            console.log('아이디가 존재합니다')
        }
    })
    console.log(req.body.id)
})

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 




app.post('/login', passport.authenticate('local', {
    failureRedirect : '/fail'
}), function(요청, 응답){
    응답.redirect('/home')
});

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) { //id가 있다면 콜백함수 실행
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        console.log('ddddd')
        return done(null, 결과)
      } else { 
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
  
  passport.deserializeUser(function (아이디, done) {
    db.collection('login').findOne({id :아이디},function(에러,결과){
        done(null, {결과})
    })

}); 


app.post('/logout', async function (req, res, next) {
    var session = req.session;
    try {
        if (session.user) { //세션정보가 존재하는 경우
            await req.session.destroy(function (err) {
                if (err)
                    console.log(err)
                else {
                  res.redirect('/');
                }
            })
        }
    }
    catch (e) {
      console.log(e)
    }
  res.redirect('/login');
})