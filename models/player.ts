import mongoose, { Schema } from "mongoose";


const Player = new Schema({
    userName: {type: String, required:true,unique: true},
    passWord: {type: String, required:true},
    fullName: {type: String},
    email: {type:String},
    avatar: {type: String, default: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg'},
    game:[{type: Schema.ObjectId,ref:'game'}],
    wishList:[{type: Schema.ObjectId,ref:'game'}],
    friends:[{type: Schema.ObjectId,ref:'player'}]
})

export default  mongoose.models.player || mongoose.model("player",Player) 
