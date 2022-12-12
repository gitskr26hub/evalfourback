const mongoose=require("mongoose")


const UserSchema={
    name:String,
    email:String,
    password:String,
    ipaddress:String,
}



const UserModel=mongoose.model("user",UserSchema)

module.exports={UserModel}