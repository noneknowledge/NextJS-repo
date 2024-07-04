import mongoose, { Schema } from "mongoose";

//Create interface for schema model
interface IGame {
    title: string
    description: string
    images: string[]
    price: number
}


//Create model 

const Game = new Schema<IGame>({
    title: {type: String},
    description: {type: String},
    images: {type: []},
    price:{type: Number}
})


export default  mongoose.models.game || mongoose.model("game",Game) 
