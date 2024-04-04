const express = require("express")
const mongoose = require("mongoose")
const serverConfig = require("./config/server.config")
const dbConfig = require("./config/db.config")
const user_model = require("./models/user.model")
const bcryptjs = require("bcryptjs")
const app = express()

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Databse not connected properly.")  
})

db.once("open", ()=>{
    console.log("Database connected.")
    init()
})

async function init(){
    let user = await user_model.findOne({userId : "admin"})

    try{
        if(user){
            console.log("Admin is already present.")
            return
        }
    }catch(err){
        console.log("Error : ", err)
    }
    
    try{
        user = await user_model.create({
            name : "Yashwant Jain",
            userId : "admin",
            password : bcryptjs.hashSync("admin",8),
            email : "yjain0418@gmail.com",
            userType : "ADMIN"
        })
        console.log("Admin created", user)
    }catch(e){
        console.log(e)
    }
}

app.listen(serverConfig.PORT, () => {
    console.log("Server is connected.")
})