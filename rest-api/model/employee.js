//schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employee = new Schema({
    
    name:{
        type:String
    },
    age:{
        type:String
    },
    email:{
        type:String
    },
    dept:{
        type:String
    }
},
{
     collection:'employees'
})

module.exports = mongoose.model("Employee",Employee);