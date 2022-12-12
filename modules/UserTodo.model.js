const mongoose=require("mongoose")


const UserTodoSchema={
    taskname:{type:String,required:true},
    status:{type:String,required:true},
    tag:{type:String,required:true},   
}



const UserTodoModel=mongoose.model("todo",UserTodoSchema)

module.exports={UserTodoModel}