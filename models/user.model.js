const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        minLength : 12,
        required : true,
        lowercase : true,
        unique : true
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }


}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("user",userSchema)