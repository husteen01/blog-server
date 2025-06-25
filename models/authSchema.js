const mongoose = require("mongoose")
const Schema = mongoose.Schema
// "npm i validator" code installing validator and is required in the schema
const {isEmail} = require("validator")
// bcrypt must be reqiured b4 being use.
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an emaill"],
        unique: true,
        validate: [isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minLength:[7, "the minimum length is 7"]
    },
}, {timestamps: true})


//"npm install bcrypt" this is a package installer that protect user password from being accessed and hash the password. Function for bcrypt below: this function is to salt and hash the password
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// function to compare password for login inside authController component;
userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password)

    return isCorrect;
}

//fuction to generate token with jwt below and import the signature from env file. The function then invoke in the login function
userSchema.methods.generateToken = function (){
    return jwt.sign({userId: this._id, name: this.name}, process.env.jwt_secret, {expiresIn: "1d"})
}

module.exports = mongoose.model("User", userSchema)
