const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    username : String, 
    email : String, 
    age : Number, 
    profession : String,
    password : String
})

module.exports = model("user" , UserSchema)