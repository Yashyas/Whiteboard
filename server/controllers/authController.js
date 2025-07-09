const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller 
const signup = async (req,res)=>{
    try {
        // Data from request body 
        const { name,email,password } = req.body;

        // finds if same email exists 
        const exists = await User.findOne({email});
        if (exists){
            return res.status(400).json({error:'Email already registered'})
        }

        // creates a user 
        const user = new User({ name, email, password })
        await user.save();

        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        res.status(500).json({error:'Signup failed'})
    }
}

// Login Controller 
const login = async (req,res)=>{
    try {
        // Data from request body 
        const { email , password } = req.body;

        // finds if user exists using email
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({error:'User not found'})
        }

        // match password 
        const passCheck = await bcrypt.compare(password,user.password)
        if (!passCheck){
            return res.status(401).json({error: 'Invalid password'})
        }
        // Reply with JWT Token on success 
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn: '1h'})

        res.status(200).json({message:'Login successful',token})
    } catch (error) {
        res.status(500).json({error:'Login failed'})
    }
}

module.exports = {
    signup,
    login,
  };