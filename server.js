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
    res.sendFile(path.join(__dirn