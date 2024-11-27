require('dotenv').config();
username = process.env.username
password = process.env.password
const express = require('express')
const mongoose = require('mongoose');
const { userInfo } = require('os');
app = express()
const port = 8000
const path = require('path')

//

app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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