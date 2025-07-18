import mongoose from "mongoose";

const authModel = new mongoose.Schema({
    uname : {type: String,required: true},
    email : {type: String,required: true},
    password: {type: String,required: true},
},{timestamps: true})

const Auth = mongoose.model("Auth",authModel)

export default Auth;