import ConnectDB from "@/libs/db_config";
import { checkToken } from "@/libs/helper";
import order from "@/models/order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const token = req.cookies.get("token")?.value as string

    try{
        const decode = checkToken(token)
        const {id} = decode 
        const myBill = await order.find({payer:id})
        return NextResponse.json(myBill)
    }
    catch(e:any){

        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
    
}