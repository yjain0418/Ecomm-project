/**
 * POST localhost8000://ecomm/api/v/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controllers/auth.controller")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup", authController.signup)
}