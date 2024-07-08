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


export async function POST (req:NextRequest){
    const formData = await req.formData();
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const newUser = new user()
    newUser.userName = formData.get("username")
    newUser.passWord = formData.get("password")
    newUser.email = formData.get("email")
    return NextResponse.json(newUser)
}