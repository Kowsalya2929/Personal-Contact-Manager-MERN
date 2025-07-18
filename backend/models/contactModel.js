import mongoose from "mongoose";

const contactModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'Auth',required: true},
    cname : {type: String, required: true},
    cimg: {type: String},
    cphone : {type: String, required: true}
},{timestamps: true})

const Contact = mongoose.model("Contact",contactModel)

export default Contact;