/**
 * Controller for creating the category
 * 
 * POST localhost:8000/ecomm/api/v1/categories
 * 
 */
const category_model = require("../models/category.model")
exports.createNewCategory = async (req,res) => {

    const request_body = req.body

    const categoryObj = {
        name : request_body.name,
        description : request_body.description
    }

    try {
        const category_created = await category_model.create(categoryObj)
        
        return res.status(200).send(category_created)

    } catch (err) {
        console.log("Error occurred while creating the category : ", err)
        res.status(400).send({
            message : "Error occurred in creating the category."
        })
    }
}