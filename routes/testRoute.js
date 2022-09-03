const express = require('express')
const fs = require('fs')
const data = require('../data/data.json')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send({"message":"Test server is working"})
})

module.exports = router