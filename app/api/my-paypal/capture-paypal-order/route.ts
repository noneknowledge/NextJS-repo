import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "../paypalAction";
import mongoose from "mongoose";
import ConnectDB from "@/libs/db_config";
import order from "@/models/order";
import player from "@/models/player";


export async function POST(req:NextRequest) {
    const data = await req.json()
    const {orderID} = data
    console.log("OrderID " + orderID)

    const response = await captureOrder(orderID)
    
   
    try{
        if (response.status !== 201) {
            throw new Error("PayPal API ERROR")
        }
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const pendingOrder = await order.findOne({orderID:orderID,status:"pending"})
        if (!pendingOrder){
            throw new Error("Order not found")
        }
        pendingOrder.status = "completed"
        await pendingOrder.save()

        const user = await player.findById(pendingOrder.payer)
        if(user){
            pendingOrder.items.map((game:any)=>{
                user.game.push(game.gameid)
            })
        }
        await user.save()

        return NextResponse.json("Completed payment")
         
    }
    catch(e:any){
        return NextResponse.json(e.message,{status:400})
    }



    
}