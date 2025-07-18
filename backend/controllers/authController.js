import Auth from '../models/authModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js'

export const postSignUp = async(req,res)=>{
    try{
        const {uname,email,password} = req.body;
        if(!uname || !email || !password){
            return res.status(400).json({success: false,message: 'All fields are required'})
        }
        const isEmail = await Auth.findOne({email})
        if(isEmail){
            return res.status(400).json({success: false,message: 'Email Already Exists , Please go to login'})
        }
        const hashpass = await bcrypt.hash(password,10)
        const uregister = await Auth.create({uname,email,password: hashpass})
        const token = jwt.sign({id: uregister._id},process.env.JWT_KEY)
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to personal contact manager',
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>personal contact manager</title>
                </head>
                <body>
                    <h2 style="text-align:center;margin-top: 30px;">Hi, <span style="text-transform: capitalize;">${uname}</span> Welcome to Personal Contact Manager 📱</h2>
                    <p style="text-align:center;">Email: ${email}</p>
                    <p style="text-align:center;">Your email has been registered in our contact manager.</p>
                </body>
                </html>`
        }
        await transporter.sendMail(mailOptions)
        res.status(200).json({success: true,message: `${uname} Registered Successfully!`,data: uregister,token})
    }catch(err){
        console.log(`Post SignUp Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}


export const postSignIn = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false,message: 'All fields are required'})
        }
        const isEmail = await Auth.findOne({email})
        if(!isEmail){
            return res.status(400).json({success: false,message: "Invalid Email, Please go to signUp"})
        }
        const isPass = await bcrypt.compare(password,isEmail.password)
        if(!isPass){
            return res.status(400).json({success: false,message: 'Invalid Password'})
        }
        const token = jwt.sign({id: isEmail._id},process.env.JWT_KEY)
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })
        res.status(200).json({success: true,message: `${isEmail?.uname} logged in successfully!`,data: {email: isEmail.email,uname: isEmail.uname},token})
    }catch(err){
        console.log(`Post SignIn Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

// export const postLogout = async(req,res)=>{
//     try{
//         const user = await Auth.findById(req.userId).select("uname")
//         if(!user){
//             return res.status(400).json({success: false,message: 'User Not Found'})
//         }
//         res.clearCookie('token',{
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
//         })
//         res.status(200).json({success: true,message: `${user?.uname} logged out successfully!`})
//     }catch(err){
//         console.log(`Post Logout Error : ${err.message}`)
//         res.status(500).json({success: false,message: 'Internal Server Error'})
//     }
// }

export const getAuth = async(req,res)=>{
    try{
        const user = await Auth.findById(req.userId).select("uname")
        if(!user){
            return res.status(400).json({success: false,message: "User not found"})
        }
        res.status(200).json({success: true,message: "Getting name from user", data: {uname: user?.uname}})
    }catch(err){
        console.log(`Get auth Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}