const express = require('express')
const fs = require('fs')
const data = require('../data/data.json')
const router = express.Router()


   

router.get('/random',(req,res)=>{
    var len = data.length 
    const rnd = Math.floor(Math.random() * (len - 0) + 1)
    const randomUser = Object.keys(data).find(user=>data[user].id === rnd)
    console.log(randomUser)
    if(randomUser !== undefined){
        res.send(data[randomUser])
    } else{
        res.send({"Message":"User missing, keep trying for next"})
    }
    
})

router.get('/all',(req,res)=>{
   fs.readFile('./data/data.json','Utf8',(err,info)=>{
        if(err){
            res.send('Error in fetching users data')
        }else{
            res.send(info)
        }
    })
    
})

router.post('/save',(req,res)=>{
    const response = req.body
    fs.readFile('./data/data.json',async(err,info)=>{
        var json = JSON.parse(info);
        json.push(response)
        if(err){
            res.send({'message':err})
        }else{
            fs.writeFile('./data/data.json',JSON.stringify(json),(err,newInfo)=>{
                if(err){
                    return res.send(err)
                }else{
                    return res.send(newInfo)
                }
                
            })
            res.send({
                'message':'New data added',
                'Data':json
            })
        }
    })
    
})

router.patch('/update/:id',(req,res)=>{
    const id = req.params
    const body = req.body

    const filteredUser = data.filter((user) => user.id !== parseInt(id.id))

    const user = data.find(user => user.id === parseInt(id.id))

    if(user){
        for(let key in body){
            if(body.hasOwnProperty(key)){
                user[key]= body[key]
            }
        }
    }else{
        res.send({"message":"Worning! no data found"})
    }
 
    if(user){
        filteredUser.push(user)
    }

    fs.writeFile('./data/data.json',JSON.stringify(filteredUser),(err)=>{
        if(err){
            res.send({"message":"Update failure"})
        }else{
            res.send(filteredUser)
        }
    })
    res.send(filteredUser)
    
})









router.patch('/bulk-update',(req,res)=>{
    const body = req.body
    let users =[]
    for(let id of body){
        const user = data.find(user => user.id === id.id)
        users.push(user)
    }
    res.send(users)

    
})









router.delete('/delete/:id',(req,res)=>{
    const id = req.params
    const filteredUser = data.filter((user) => user.id !== parseInt(id.id))
    fs.writeFile('./data/data.json',JSON.stringify(filteredUser),(err)=>{
        if(err){
            return res.send(err)
        }
    })
    res.send({"message":"Update successful"})

})

module.exports = router