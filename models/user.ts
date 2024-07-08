import mongoose, { Schema } from "mongoose";


const User = new Schema({
    userName: {type: String, required:true},
    passWord: {type: String, required:true},
    fullName: {type: String,required:true},
    email: {type:String},
    avatar: {type: String, default: ''},
    game:[{type: Schema.ObjectId,ref:'game'}]
})

export default  mongoose.models.user || mongoose.model("user",User) 
