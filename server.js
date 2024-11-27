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


app.post('/api/v1/add-user', async(req, res) => {

    const { id, university_Id, role, first_name, last_name, password} = req.body
    try {
        const existingUser = await User.findById(id)
        if(existingUser){
            return res.status(400).send('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            id: id,
            university_Id: university_Id,
            role: role,
            first_name: first_name,
            last_name: last_name,
            password: hashedPassword
        })
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
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