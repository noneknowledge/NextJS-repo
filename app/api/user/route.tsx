import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import user from "@/models/user";


export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    try{
        const data = await user.find({})
        return NextResponse.json(data)
    }
    catch(err:any){
        return NextResponse.json(err.message)
    }
}


