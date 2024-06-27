import ConnectDB from "@/libs/db_config";
import SketchModel from "@/models/sketch";
import { HydratedDocument } from "mongoose";

import { NextResponse } from "next/server";



export async function GET(request:Request){
    await ConnectDB();

    const data:any = await SketchModel.find({})
    
    console.log(typeof(data))
    return NextResponse.json(data)
}