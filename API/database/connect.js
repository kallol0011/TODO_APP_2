
const mongoose=require ("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoUrl)




3

const todosschema=mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    isComplete:{
        type:Boolean,
        default:false
    
    }
})


const todoModel=mongoose.model("todo",todosschema)

module.exports={
    connection,
    todoModel
}