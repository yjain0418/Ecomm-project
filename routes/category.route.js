const categoryController = require("../controllers/category.controller")
const authMw = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken, authMw.isAdmin], categoryController.createNewCategory)
}