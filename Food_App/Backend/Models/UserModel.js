const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const {DB_LINK} = require("../Secrets");

mongoose.connect(DB_LINK)
    .then(function(db){
        console.log("Database is connected to server!");
    })
    .catch(function(err){
        console.log("error: "+ err.message);
    })

// Schema for user
const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);    //change after applying email validator
        }
    },
    password: {
        type: String,
        required: true,
        maxLength: 10
    },
    confirmPassword: {
        type: String,
        required: true,
        maxLength: 10,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    },
    age: { type: Number}
})
// Model for User
const UserModel = mongoose.model("UserModel", userSchema);

// create the user
(async function createUser(){
    let user = await UserModel.create({
        name: "Nakshita",
        email: "abcd@gmail.com",
        password: "123123",
        confirmPassword: "123123",
        age: 21
    })
    console.log("user: ", user);
})();
