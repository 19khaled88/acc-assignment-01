const express = require('express')
const fs = require('fs')
const data = require('../data/data.json')
const router = express.Router()


router.patch('/:id',(req,res)=>{
    // const id = req.params
    const body = req.body
    let edit ={}
    // const filteredUser = file.filter((user) => user.id !== parseInt(id.id))
    // const user = file.find(user => user.id === parseInt(id.id))
    // if(user){
    //     res.send(user)
    // }else{
    //     res.send({"message":"Worning! no data found"})
    // }

    // user.Object.keys(body) = Object.values(body)
    for(let key in body){
        if(body.hasOwnProperty(key)){
            edit[key]= body[key]
        }
    }
    res.send(edit)
    
})
router.patch('/bulk-update',(req,res)=>{

})

module.exports = router