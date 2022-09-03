const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 9000
const userRoute = require('./routes/userRoute.js')
const testRoute = require('./routes/testRoute')

const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json({limit:'1mb'}))

app.use('/user',userRoute)
app.use('/',testRoute)

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})