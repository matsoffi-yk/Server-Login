// ฟิก
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //
var session = require('express-session') //ใช้เก็บ state
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
//
app.use(express.static('./public')); //เรียก html
app.set('views', './views')
app.set('view engine', 'ejs')

app.post('/admin', urlencodedParser, (req, res) => { //app.post ใช้กรณีที่เป็น body parser
    session = req.session //แสดงข้อมูลใน ตรวจสอบ
    session.email = req.body.email
    password = req.body.password
    if (session.email == '' && password == '240311' || password == '') {
        res.send(`<html>
        <head>
        </head>
        <body>
        <h1 style="align:center;">
        Please Login Frist
        </h1>
        <a href="/" class="btn btn-primary">Login</a>
        </body>
        </html>`)
    }
    else {
        res.render('user'/* ชื่อไฟล์ .ejs*/, { email: req.session.email })
    }
});

app.get('/logout', (req, res) => { //app.get กรณีไม่มี body parser
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
app.listen(8000);