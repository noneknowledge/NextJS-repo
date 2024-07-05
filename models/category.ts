import mongoose, { Schema } from "mongoose";

//Create interface for schema model
interface ICategory {
    title: string
    description: string
    images: string[]
    price: number
}

//Create model 

const Category = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    game:[{type: Schema.ObjectId,ref:'game'}]
})


export default  mongoose.models.category || mongoose.model("category",Category) 
