import ConnectDB from "@/libs/db_config";
import { checkToken } from "@/libs/helper";
import order from "@/models/order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:any) {
    const {orderid} = params
    const token = req.cookies.get("token")?.value as string

    if(token === null){
        return NextResponse.json("Unauthorized",{status:401})
    }
    try{
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const decode = checkToken(token)
        const {id} = decode 
        const bill = await order.findOne({orderID:orderid,payer:id}).populate('items.gameid',"images","game")
        if(bill.length === 0){
            return NextResponse.json("not found") 
        }
        return NextResponse.json(bill)
    }
    catch(e:any){

        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
   
}