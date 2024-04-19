/**
 * Logic to register a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../config/auth.config")
exports.signup = async (req, res) => {
    /**
     * Logic to create a user
     * 
     */
     // 1. Read the request data
        const request_body = req.body
     // 2. Insert the data in Users Collection in MongoDB
        const userObj = {
            name : request_body.name,
            userId : request_body.userId,
            password : bcrypt.hashSync(request_body.password,8),
            email : request_body.email,
            userType : request_body.userType
        } 

        try{
            const user_create = await user_model.create(userObj)
            /**
             * Return this user
             */

            const res_obj = {
                name : user_create.name,
                userId : user_create.userId,
                email : user_create.email,
                userType : user_create.userType,
                createdAt : user_create.createdAt,
                updatedAt : user_create.updatedAt
            }
            
            res.status(201).send(res_obj)
        }catch(err){
            console.log("Error while registering the user : ", err)
            res.status(500).send({
                message : "Some error occurred while registering the user."
            })
        }
     // 3.Return the response back to the user 
}

exports.signin = async (req, res) => {

    //check if the user id is present or not
    const user = await user_model.findOne({userId : req.body.userId})

    if(user == null){
        res.status(400).send({
            message : "User Id is not valid."
        })
    }

    //Password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    
    if(!isPasswordValid){
        res.status(401).send({
            nessage : "Wrong Password passed"
        })
    }

    //using jwt we will create access token with a giv     en TTL and return
    const token = jwt.sign({id : user.userId}, secret.secret, {
        expiresIn : 120
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })

}