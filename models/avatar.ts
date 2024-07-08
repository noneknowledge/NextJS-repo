import mongoose, { Schema } from "mongoose";


const Avatar = new Schema({
    title: {type: String, required:true},
    desription: {type: String},
    link: {type: String},
})

export default  mongoose.models.avatar || mongoose.model("avatar",Avatar) 
