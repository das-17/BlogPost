const express = require('express');
const app = new express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_database');
const ejs = require('ejs');

const fileUpload = require('express-fileupload');
const validationMiddleware = require('./middleware/validationMiddleware');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectAuthMiddleware = require('./middleware/redirectAuthMiddleware');
const flash = require('connect-flash');

app.set('view engine', 'ejs');

global.loggedIn = null;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());
app.use('/posts/store', validationMiddleware);
app.use(expressSession({
    secret: "keyboard cat"
}));

app.use(flash());

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

const newUserController = require('./controller/newUser');
const newPostController = require('./controller/newPost');
const homeController = require('./controller/home');
const storePostController = require('./controller/storePost'); 
const getPostController = require('./controller/getPost');
const storeUserController = require('./controller/storeUser');
const loginController = require('./controller/login');
const loginUserController = require('./controller/loginUser');
const logoutController = require('./controller/logout');

app.listen(4000,()=>{
    console.log("Listening to port 4000");
});


app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Internal Server Error');
  });

app.get('/', homeController);

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', authMiddleware,storePostController);

app.get('/posts/:id', getPostController);

app.get('/auth/register', redirectAuthMiddleware, newUserController);

app.post('/users/register', redirectAuthMiddleware, storeUserController);

app.get('/auth/login', redirectAuthMiddleware, loginController);

app.post('/users/login', redirectAuthMiddleware,loginUserController);

app.get('/auth/logout', logoutController);

app.use((req, res) => {
    res.status(404).render('notfound');
});
