const User = require("../models/authSchema")
const handleError = require("../utils/handleErrors")

const register = async(req, res)=>{
   try {
    const user = await User.create(req.body)
    res.status(201).json({success: true, user})
   } catch (error) {
     // res.json({error})
     //console.log(error);
     const errors = handleError(error)
     res.status(400).json(errors);
   }
}

const login = async(req, res)=>{
    // res.send("login")
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({success:false, msg: "Please provide necessary information"})
    }
    try {
        // check if user has registered
        const userExists = await User.findOne({email});
        if(!userExists){
           
            throw Error("incorrect email")
        }
    
        // check if password is correct
        const authenticated = await userExists.comparePassword(password)
        if (!authenticated) {
           
            throw Error("incorrect password")
        }
    
        const token = userExists.generateToken()
        res.status(200).json({
            success: true, 
            user: {name: userExists.name, email: userExists.email},
            token
        })
    } catch (error) {
        // res.json({error})
        const errors = handleError(error)
        res.status(400).json(errors)
    }
}


module.exports = {register, login}