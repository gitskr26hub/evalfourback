
const jwt=require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token=req.headers?.authenticate?.split(" ")[1]
    if(token){
        const decode=jwt.verify(token,'hush')
        if(decode){
            const userId=decode.userId
            req.body.userId=userId
            next()
        }
        else{
            res.send({msg:"plz login "})
        }
    }
    else{
        res.send({msg:"plz login "})
    }
}

module.exports={authenticate}