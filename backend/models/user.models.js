import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    Username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    referencetoken:[{
        type:String,
        required:true
    }],
}
,{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
}) 
userSchema.methods.generateAcesssToken = function() {
    return jwt.sign({
        id: this._id,
        Username: this.Username,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1" 
    })
} 

userSchema.methods.generateRefreshToken = function() {
 return jwt.sign({
        id: this._id,
        Username: this.Username,
        email: this.email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10" 
    })
} 
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


export const User = mongoose.model("User",userSchema);