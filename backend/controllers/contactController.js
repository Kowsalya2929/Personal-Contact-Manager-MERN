import mongoose from 'mongoose';
import Contact from '../models/contactModel.js'

export const getAllContact = async(req,res)=>{
    try{
        const {search = ''} = req.query; 
        const query = {
            userId: req.userId,
            ...(search && {
                $or: [
                    {cname : { $regex: search, $options: 'i' }},
                    {cphone : { $regex: search, $options: 'i' }}
                ]
            })
        }
        const getAllc = await Contact.find(query).sort({createdAt: -1})
        res.status(200).json({success: true,message: 'Get All contact with search cname or cphone',data: getAllc})
    }catch(err){
        console.log(`Get All Contact Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal server error'})
    }
}

// export const getSingleContact = async(req,res)=>{
//     try{
//         const getSingleC = await Contact.findOne({_id:req.params.id,userId: req.userId})
//         if(!getSingleC){
//             return res.status(400).json({success: false,message: 'Contact Not Found'})
//         }
//         res.status(200).json({success: false,message: 'Get single contact',data: getSingleC})
//     }catch(err){
//         console.log(`Get Single Contact Error : ${err.message}`)
//         res.status(500).json({success: false,message: 'Internal server error'})
//     }
// }

export const postContact = async(req,res)=>{
    try{
        const {cname,cimg,cphone} = req.body;
        if(!cname || !cphone){
            return res.status(400).json({success: false,message: 'All fields are required'})
        }
        const isCName = await Contact.findOne({cname})
        if(isCName){
            return res.status(400).json({success: false,message: 'Name Already exists. Use Another Name'})
        }
        const iscNum = await Contact.findOne({cphone})
        if(iscNum){
            return res.status(400).json({success: false,message: 'Number Already exists. Use Another number'})
        }
        const cpost = await Contact.create({userId: req.userId,cname,cimg,cphone})
        res.status(200).json({success: true,message: 'Contact created',data: cpost})
    }catch(err){
        console.log(`Post Contact Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal server error'})
    }
}

export const patchContact = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Contact Id'})
        }
        const {cname,cimg,cphone} = req.body;
        if(!cname || !cimg || !cphone){
            return res.status(400).json({success: false,message: "All fields are required"})
        }
        const patchedc = await Contact.findOneAndUpdate({_id:req.params.id,userId: req.userId},req.body,{new: true})
        res.status(200).json({success: true,message: 'Contact Updated',data: patchedc})
    }catch(err){
        console.log(`Put Contact Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal server error'})
    }
}

export const deleteContact = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Contact Id'})
        }
        const deletedc = await Contact.findOneAndDelete({_id: req.params.id,userId: req.userId})
        res.status(200).json({success: true,message: 'Contact Deleted', data: deletedc})
    }catch(err){
        console.log(`Delete Contact Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal server error'})
    }
}
