import mongoose from "mongoose";
const User = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        select: true,
    },
    userRole:{
        type: String,
        enum : ['user','professor','nupex', 'admin'],
        default: 'user'
    },
});



export default mongoose.model("User", User);