require('dotenv').config()
username = process.env.username
password = process.env.password

port = 8000
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
const User = require('./models/users.models');
let app = express();
var bcrypt = require('bcryptjs');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const path = require('path')

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', (req, res) => {
    res.render('login')
})

app.get("/test", isLoggedIn, function (req, res) {
    res.render("test");
});

app.post('/api/v1/add-user', async(req, res) => {
    console.log('in add user')
    // console.log('Request Body:', req.body); // Debug incoming data
    const { username, university, role, first_name, last_name, password} = req.body
    try {
        const existingUser = await User.findOne({ username: username });
        if(existingUser){
            return res.status(400).send('User already exists')
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username: username,
            university: university,
            role: role,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword
        })
        res.status(200).json(user)
    }
    catch(error){
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({ message: 'User ID already exists' });
        }
        res.status(500).json({ message: error.message });
    }
})


app.post('/api/v1/login', async(req, res) => {
    const { username, password} = req.body
    try{
        const existingUser = await User.findOne({username: username})
        if(!existingUser){
           res.status(500).send('User does not exist')
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch){
            return res.status(500).send('Incorrect Password')
        }
        console.log('correct password')
        res.render("test");
    }
    catch(error){
        console.error('error', error)
    }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

//connect to server and databse
mongoose.connect(`mongodb+srv://${username}:${password}@schoolsystem.zku33.mongodb.net/?retryWrites=true&w=majority&appName=SchoolSystem`)
    .then(() => {
        console.log('connected to database')
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on localhost:${port}`)
        })
    })
    .catch(() => {
        console.log('Connection failed')
    })