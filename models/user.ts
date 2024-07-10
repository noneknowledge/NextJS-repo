import mongoose, { Schema } from "mongoose";


const User = new Schema({
    userName: {type: String, required:true,unique: true},
    passWord: {type: String, required:true},
    fullName: {type: String},
    email: {type:String},
    avatar: {type: String, default: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg"'},
    game:[{type: Schema.ObjectId,ref:'game'}],
})

export default  mongoose.models.user || mongoose.model("user",User) 
