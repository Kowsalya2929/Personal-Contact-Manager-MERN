import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next) =>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({success: false,message: 'Not Authorized login Again'})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_KEY)
        req.userId = tokenDecode.id;
        next()
    }catch(err){
        console.log(`Auth middleware error : ${err.message}`)
        res.status(500).json({success: false,message: "Inavlid token"})
    }
}

export default authMiddleware;