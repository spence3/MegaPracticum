require('dotenv').config()
username = process.env.username
password = process.env.password
const express = require('express')
const mongoose = require('mongoose')
const { userInfo } = require('os')
app = express()
const port = 8000
const path = require('path')
var bcrypt = require('bcryptjs');


const User = require('./models/users.models')


app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/dashboard', (req, res) => {
    res.send("welcome to dashboard")
})


app.post('/api/v1/login', async(req, res) => {
    const { userName, password} = req.body

    try{
        const existingUser = await User.findOne({first_name: userName})
        if(!existingUser){
           res.status(500).send('User does not exist')
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch){
            res.status(500).send('Incorrect Password')
        }
        res.status(200).send('Correct Password!')
        res.render('test')
    }
    catch(error){
        console.error('error', error)
    }
    
    
})

app.post('/api/v1/add-user', async(req, res) => {
    console.log('Request Body:', req.body); // Debug incoming data
    const { user_Id, university_Id, role, first_name, last_name, password} = req.body
    console.log(`${user_Id} ${university_Id}, ${role}, ${first_name}, ${last_name}, ${password}`)
    try {
        const existingUser = await User.findOne({ user_Id: user_Id });
        if(existingUser){
            console.log('they exists')
            return res.status(400).send('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('creating user...')
        const user = await User.create({
            user_Id: user_Id,
            university_Id: university_Id,
            role: role,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword, 
        })
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

app.post('/api/v1/login', (req, res) => {

})


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