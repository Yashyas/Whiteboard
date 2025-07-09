const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const user = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true, 
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

user.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    } 
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', user);
module.exports = User;