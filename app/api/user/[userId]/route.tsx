import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import player from "@/models/player";


export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    
    try{
        const data = await player.find({}).select("userName")
        return NextResponse.json(data)
    }
    catch(err:any){
        return NextResponse.json(err.message)
    }
}