import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import avatar from "@/models/avatar";
import { title } from "process";

export async function GET(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    try{
        const data = await avatar.find({})
        return NextResponse.json(data)
    }
    catch(err:any){
        return NextResponse.json(err.message)
    }
}

export async function POST(req:NextRequest) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const formData = await req.formData()
    
    try{
        const newAvatar = await avatar.create({
            title: formData.get("title"),
            description: formData.get("description"),
            link: formData.get("link")

        })
        return NextResponse.json(newAvatar)
    }
    catch (err:any){
        return NextResponse.json({message:err.message},{status:500})
    }
}
