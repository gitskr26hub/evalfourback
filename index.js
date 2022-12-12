const express=require("express")
const app=express()
require('dotenv').config()
const cors=require("cors")
const fs=require("fs")
const bcrypt = require('bcrypt');

const dns = require('node:dns');

const {TodoRouter}=require("./routes/todo.routes")

app.use(express.json())
app.use(cors({origin:"*"}))


var jwt = require('jsonwebtoken');
const {UserModel}=require("./modules/User.model")
const {UserTodoModel}=require("./modules/UserTodo.model")
const {connection}=require("./config/db")
const { authenticate } = require("./middleware/authentication")

app.get("/",(req,res)=>{
    res.send("welcome here backend")
})

// for signup 
app.post("/signup",async(req,res)=>{
    console.log(res.body)
    const {email,password,name}=req.body
    const userExist=await UserModel.findOne({email})

    if(userExist?.email){
      res.send({msg:"user already exist,plz login"})  
    }
    else{
    try{
        // for get ip address
        const ipaddress = (req) =>req.headers['x-forwarded-for']?.split(',').shift()|| req.socket?.remoteAddress
       bcrypt.hash(password,1,async(err,hash)=>{
        const UserNew=new UserModel({email,password:hash,name,ipaddress})
        await UserNew.save()
        res.send("Signup done , please login to use TODO")
    })

        }
        catch(err){
            console.log(err)
            res.send({msg:"something went wrong with signup"})
        }
    }
})



/// login 

app.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await UserModel.find({email})

        if(user.length>0){
            const decrpt_pass=user[0].password
            bcrypt.compare(password,decrpt_pass,(err,result)=>{
                if(result){
               
                const token=jwt.sign({"userId":user[0]._id},"hush")
               res.send({msg:"login success","token":token})
                }
                else{
                    res.json({msg:"login fail"})
                }
            })
        }
        else{
            res.json({msg:"login fail"})


        
        }

    }
    catch(err){
        console.log(err)
        res.send({msg:"login err"})
    }
})







// protect todoRouter from here

app.use(authenticate)
app.use("/todos",TodoRouter)



console.log("mongo",process.env.mongo_url)

app.listen(7000,async()=>{

    try{
      await console.log(`port started at 7000`)
    }
    catch(err){
       console.log("port err",err)
    }

})