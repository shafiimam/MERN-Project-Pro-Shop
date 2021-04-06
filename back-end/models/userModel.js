import pkg from 'mongoose'

const mongoose = pkg;


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true,
    },
    password:{
        type: String,
        required : true
    },
    isAdmin:{
        type: Boolean,
        required : false,
        default: false
    }
    
},{
    timestamps : true,
})

const User =  mongoose.model('user',userSchema)

export default User;