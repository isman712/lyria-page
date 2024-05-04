const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const lyria = require('lyria-err')
const { elogs } = require('lyria-logs')

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const sassCompiler = require('./util/scss.js');
const { cuerpo } = require('./util/cuerpo.js');
const passport = require('./util/passport.js');

const app = express();
lyria.configureReact(app, "./src/jsx", cuerpo)
sassCompiler('./src/scss')

app.use(session({
    secret: 'DomeMiLove',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async(req, res, next) => {

    next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;

