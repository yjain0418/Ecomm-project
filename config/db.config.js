require('dotenv').config();

module.exports = {
    DB_NAME : "ecomm_project",
    DB_URL : process.env.MONGODB_URI
}