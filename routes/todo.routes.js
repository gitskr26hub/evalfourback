const express=require("express")

const {UserTodoModel}=require("../modules/UserTodo.model")

const TodoRouter=express.Router()

TodoRouter.get("/",async(req,res)=>{
const todo=await UserTodoModel.find();
res.send(todo)
})



TodoRouter.post("/create",async(req,res)=>{
    const todos=req.body;



try{
    const new_todo=new UserTodoModel(todos)
    await new_todo.save()
    res.send({msg:"todo created here "})


}catch(err){
    console.log(err)
    res.json({msg:"something went wrong to post method"})
}

 })


 TodoRouter.patch("/update/:todoID",async(req,res)=>{
    const payload=req.body
     const todoID=req.params.todoID;
     const userID=req.body.userID
     const todo=await UserTodoModel.findOne({_id:todoID})

     if(userID!==todoID){
        res.send("wrong person")
     }
     else {
        await UserTodoModel.findByIdAndUpdate({_id:todoID},payload)
        res.send("update success")
     }
 })


TodoRouter.delete("/delete/:todoID",async(req,res)=>{
    const todoID=req.params.todoID;
    await UserTodoModel.findByIdAndDelete({_id:todoID})
    res.send("delete success")
})


 module.exports={TodoRouter}