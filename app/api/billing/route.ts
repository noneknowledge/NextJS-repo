import ConnectDB from "@/libs/db_config";
import order from "@/models/order";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    
    const myBill = await order.find()
    return NextResponse.json(myBill)
}