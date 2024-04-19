const user_model = require("../models/user.model")

/**
 * Create a mw will check if the request body is proper and correct
 */
const verifySignUpBody = async (req, res, next) => {
    try{

        //check for the name
        if(!req.body.name){
            res.status(400).send({
                message : "Failed! Name is not provided in the request."
            })
        }

        //check for the email
        if(!req.body.email){
            res.status(400).send({
                message : "Failed! Email is not provided in the request."
            })
        }

        //check for the userId
        if(!req.body.userId){
            res.status(400).send({
                message : "Failed! User Id is not provided in the request."
            })
        }

        //check if same userId already present
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            res.status(400).send({
                message : "Failed! User Id is not available."
            })
        }

        next()
    }
    catch(err){
        console.log("Error while validating the request object : ", err)
        res.status(400).send({
            message : "Error while validating the request body."
        })
    }
}


const verifySignInBody = async (req,res,next) => {
    try {
       if(!req.body.userId){
        res.status(400).send({
            message : "Failed! User id is not provided in the request."
        })
       } 

       if(!req.body.password){
        res.status(400).send({
            message : "Failed! Password is not provided in the request."
        })
       }

        next()
    
    } catch (error) {
        console.log("Error occurred : ", error)
        res.status(400).send({
            message : "Error occurred while logging in."
        })
    }
}
module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}