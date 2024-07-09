import mongoose, { Schema } from "mongoose";


const Avatar = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    link: {type: String},
})

export default  mongoose.models.avatar || mongoose.model("avatar",Avatar) 
