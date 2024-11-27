require('dotenv').config()
username = process.env.username
password = process.env.password

const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
let app = express()
const port = 8000
const path = require('path')
var bcrypt = require('bcryptjs');

const User = require('./models/users.models')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('express-session')({
    secret: 'heres the secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(express.static(path.join(__dirname, 'views')))


app.get('/', (req, res) => {
    res.render('login')
})

app.get('/test', loggedIn, function(req, res) {
    console.log("successfully logged in!")
    res.render('test')
})

// app.get('/test', (req, res) => {
//     res.render('test')
// })

app.post('/api/v1/login', async(req, res) => {
    const { userName, password} = req.body
    try{
        const existingUser = await User.findOne({first_name: userName})
        if(!existingUser){
           res.status(500).send('User does not exist')
        }
        const isMatch = password === User.password;
        console.log(password, User.password)

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

app.post('/api/v1/add-user', async(req, res) => {
    console.log('Request Body:', req.body); // Debug incoming data
    const { user_Id, university_Id, role, first_name, last_name, password} = req.body
    
    try {
        const existingUser = await User.findOne({ user_Id: user_Id });
        if(existingUser){
            console.log('they exists')
            return res.status(400).send('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            user_Id: user_Id,
            university_Id: university_Id,
            role: role,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword
        })

        await User.register(user, password);
        console.log('success')
        res.status(200).json(user)
    }
    catch(error){
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({ message: 'User ID already exists' });
        }
        console.log('Error:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
})


function loggedIn(req, res, next){
    console.log('in loggedin function')
    if (req.isAuthenticated()) return next()
    res.redirect('/')
}

//connect to server and databse
mongoose.connect(`mongodb+srv://${username}:${password}@schoolsystem.bxba5.mongodb.net/?retryWrites=true&w=majority&appName=SchoolSystem`)
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