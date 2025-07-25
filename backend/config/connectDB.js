import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected Successfully!")
    }catch(err){
        console.log(`MongoDB Connection Error : ${err.message}`)
    }
}

export default connectDB;