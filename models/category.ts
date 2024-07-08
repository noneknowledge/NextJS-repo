import mongoose, { Schema } from "mongoose";

const Category = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    game:[{type: Schema.ObjectId,ref:'game'}]
})


export default  mongoose.models.category || mongoose.model("category",Category) 
