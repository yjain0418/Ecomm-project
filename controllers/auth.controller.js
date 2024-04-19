/**
 * Logic to register a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
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