import mongoose, { Schema } from "mongoose";

//Create interface for schema model
interface IGame {
    title: string
    description: string
    images: string[]
}


//Create model 

const Game = new Schema<IGame>({
    title: {type: String},
    description: {type: String},
    images: {type: []},
})


export default  mongoose.models.game || mongoose.model("game",Game) 
