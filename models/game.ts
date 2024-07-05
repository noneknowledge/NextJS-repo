import mongoose, { Schema } from "mongoose";

//Create interface for schema model
// interface IGame {
//     title: string
//     description: string
//     images: string[]
//     price: number

// }


//Create model 

const Game = new Schema({
    title: {type: String},
    description: {type: String},
    images: {type: []},
    price:{type: Number},
    categories:[{type: Schema.ObjectId,ref:'category'}]
})


export default  mongoose.models.game || mongoose.model("game",Game) 
