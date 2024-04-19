/**
 * POST localhost8000://ecomm/api/v/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody] ,authController.signup)


    app.post("/ecomm/api/v1/auth/signin", authController.signin)
}