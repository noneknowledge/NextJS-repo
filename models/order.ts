import mongoose, { Schema } from "mongoose";
import { OBJECT } from "swr/_internal";


const orderDetail = new Schema({
    //fields
    gameid:{type:Schema.ObjectId, ref:'game'},
    title: {type: String, required:true},
    price:{type:Number }, 
},
//options
{
    _id:false
}
)

const Order = new Schema({
    orderID: {type: String, required:true,unique: true},
    paymentMethod: {type:String, enum:["PayPal"],default:"PayPal"},
    status: {type:String,enum:["pending","completed"],default:"pending"},
    items:[{type:orderDetail}],
    payer: {type: Schema.ObjectId, ref:"player" ,required:true},
    total:{type:Number,required:true},
    currency_code:{type:String,default:"USD"}
},
{
    timestamps:true
})

export default  mongoose.models.order || mongoose.model("order",Order) 
