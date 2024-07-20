
import { NextRequest,NextResponse } from "next/server"
import category from "@/models/category"
import game from "@/models/game"
import mongoose from "mongoose"
import ConnectDB from "@/libs/db_config"


export async function GET(req:NextRequest, {params}:any) {
  
    const {id} = params

    try{
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const cate = await category.findById(id)
        const games = await game.find({categories:id})
        
        if (cate === null)
            return NextResponse.json({message:"game not found"},{status:404})
        return NextResponse.json({data:{cate,games}},{status:200})

    }
    catch (err:any){
        const mess = "Error: " + err.message
        return NextResponse.json({message:mess},{status:404})
    }
}
