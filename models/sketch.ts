import mongoose, { Schema } from "mongoose";

//Create interface for schema model
interface ISketch {
    title: string
    description: string
    images: string[]
    favorite: boolean
    day: number
    slug: string
}


//Create model 

const Sketch = new Schema<ISketch>({
    title: {type: String},
    description: {type: String},
    images: {type: []},
    favorite: {type:Boolean},
    day: {type:Number},
    slug: {type: String}
})
const SketchModel = mongoose.model("sketch",Sketch)

export default SketchModel
