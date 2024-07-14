import mongoose, { now, Schema } from "mongoose";


const Reply =  new Schema({
    userId: {type: Schema.ObjectId, ref: 'player'},
    content: {type: String}},{
        timestamps:true
    })

const Comment = new Schema({
    gameId: {type: Schema.ObjectId, ref: 'game'},
    userId: {type: Schema.ObjectId, ref: 'player'},
    comment: {type: String},
    createAt: {type: Date,default: Date,now},
    reply: [ {type:Reply}]   
})

export default  mongoose.models.comment || mongoose.model("comment",Comment) 
