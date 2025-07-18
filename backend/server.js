import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import authRoute from './routes/authRoute.js'
import contactRoute from './routes/contactRoute.js'
import cookieParser from 'cookie-parser'
import path from 'path'

const __dirname = path.resolve()

const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())

const allowOrigin = [
    // "http://localhost:5173",
    // "http://localhost:8000",
    "https://personal-contact-manager-mern.onrender.com"]


app.use(cors({
    origin: allowOrigin,
    credentials: true
}))

app.use('/api/auth',authRoute)
app.use('/api/contact',contactRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/dist')))
}

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})