const express=require('express')
const path=require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User=require('./model/user')
const evento= require('./model/event')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var a = null
var ido2

const secret = 'rfwej92092982!@#$%dsjjp@#ksksakd98292'

mongoose.connect('mongodb://127.0.0.1:27017/login-app-db')
const app=express()
app.use('/',express.static(path.join(__dirname,'public')))
app.use(bodyParser.json()) 

app.post('/api/change-password', (req,res)=>{
    const{token}=req.body

const user = jwt.verify(token,secret)})

app.post('/api/login',async(req,res)=>
{
    const{ username,password }=req.body
    ido2=username

    const user = await User.findOne({username}).lean()

    if(!user){
        return res.json(error,'Invalid username/password')
    }

    if(await  bcrypt.compare(password,user.password)){
        const token = jwt.sign({id: user.__id,username: user.username}, secret)
        a=user.username
        return res.json({status:'ok',data:'Pwd  good',ido:a})

    }
    res.json({status:'error',error:'Invalid username/password'})
})
app.post('/api/register',async(req,res)=>{
    console.log(req.body)
    const{ username,password: plainTextpwd,name,phno}=req.body


    const password = await bcrypt.hash(plainTextpwd,13)

    try{
        const response = await User.create({
            username,
            password,
            name,
            phno
        })
        console.log('User created',response)
        
    }catch(error){
        if(error.code === 11000){
            return res.json({status:'error', error:'Username in use'})
            
        }
        throw error
    }
    res.json({status:'ok'})
    
})
app.post('/api/userevent',async(req,res)=>{
    const idol=req.body.idol
    const ido=req.body.id1
    var recorduser=await User.findOne({ username:idol })
    console.log("ayo",recorduser,idol)
    try{
        var nono
        if(recorduser.events.length>0){
        nono=recorduser.events
        nono.push(ido)}
        else{nono=[ido]}
        console.log(nono)
        const reto = await User.updateOne(
            {
                username:idol
            },
            {
                $set:{
                    events:nono
                }
            }
        )
        console.log('User updated',recorduser.events)
        
    }catch(error){
        if(error.code === 11000){
            return res.json({status:'error', error:'Username in use'})
            
        }
        throw error
    }
    res.json({status:'ok',usid:recorduser._id})
    
})
app.post('/api/eventtouser',async(req,res)=>{
    const idol=req.body.huhu
    const ido=req.body.id1
    console.log("why",idol)
    var recordevent=await evento.findById(ido).lean()
    console.log("ayo",recordevent,idol)
    try{
        var nonon
        if(recordevent.users.length>0){
        nonon=recordevent.users
        nonon.push(idol)}
        else{nonon=[idol]}
        console.log(nonon)
        const reto = await evento.updateOne(
            {
                _id:ido
            },
            {
                $set:{
                    users:nonon
                }
            }
        )
        console.log('event updated',ido,recordevent.users,reto)
        
    }catch(error){
        if(error.code === 11000){
            return res.json({status:'error', error:'Username in use'})
            
        }
        throw error
    }
    res.json({status:'ok',usid:recordevent._id})
    
})
app.post('/api/get',async(req,res)=>{
    console.log(ido2,"interesting")
    var records = await User.findOne({username:ido2}).lean()
    var yesss= records.events
    console.log(yesss)
    res.json(yesss)
}
)
/*app.post('/api/getpara',async(req,res)=>{
    console.log(ido2,"interesting")
    var records = await evento.findOne({eventname:ido2}).lean()
    var yesss= records.description
    console.log(yesss)
    res.json(yesss)
}
)*/
app.post('/api/getto',async(req,res)=>{
    const ido20=req.body.eventid
    var records2 = await evento.findById(ido20).lean()
    console.log(records2,"hachi")
    res.json(records2)
}
)
app.post('/api/createevent',async(req,res)=>{
    console.log(req.body)
    const Evename=req.body.eventname
    const city=req.body.city
    const address=req.body.address
    const time=req.body.time
    const date=req.body.date
    const desco=req.body.desco
    console.log(Evename)
    //const password = await bcrypt.hash(plainTextpwd,13)

    try{
        const responseEve = await evento.create({
            eventname:Evename,
            city,
            address,
            time,
            date,
            description:desco
        })
        console.log('User created',responseEve)
        var presid=responseEve._id
        
    }catch(error){
        if(error.code === 11000){
            return res.json({status:'error', error:'Username in use'})
            
        }
        throw error
    }
    console.log(presid)
    res.json({status:'ok',eventid:presid})
    
})
app.listen(9999,()=>{
    console.log("Server up at 9999")
})