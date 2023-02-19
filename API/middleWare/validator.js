
const express=require("express")

function validator(req,res,next){

    if(req.body.task==="")
    {
        res.send("please fill the box")
    }

    else
    {
        next()
    }

}
module.exports=validator