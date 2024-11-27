const express = require('express')
app = express()
const port = 8000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.post('/api/v1/login', (req, res) => {
    
    res.status(200).send('succesffuly logged in')
})

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})