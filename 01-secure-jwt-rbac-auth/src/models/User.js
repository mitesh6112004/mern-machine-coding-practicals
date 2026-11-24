import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        minlength : 2,
        maxlength : 50,
        trim : true
    },
    email : {
        type : String, 
        required : [true, "Email is required"],
        lowercase : true,
        unique : true, 
        trim : true
    },
    passwordHash : {
        type : String, 
        required : [true, "Password is required"],
        select : false
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    refreshTokenHash : {
        type : String,
        default : null,
        select : false
    },
    tokenVersion : {
        type : Number,
        default : 0
    }
}, {
    timestamps : true
})

const User = mongoose.model("User", userSchema); 
export default User;