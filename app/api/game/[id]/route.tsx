import { NextRequest, NextResponse } from "next/server"
import game from "@/models/game"

import mongoose from "mongoose"
import ConnectDB from "@/libs/db_config"


export async function GET(req:NextRequest, {params}:any) {

    const {id} = params
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    try{
        
        const item = await game.findById(id).populate("categories","title _id","category")
        
        if (item === null)
            return NextResponse.json({message:"game not found"},{status:404})
        return NextResponse.json({message:item},{status:200})

    }
    catch (err:any){
        const mess = "Error: " + err.message
        return NextResponse.json({message:mess},{status:404})
    }
}

export async function PUT(req:NextRequest, {params}:any) {
    
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    
    const {id} = params
    const formData = await req.formData();
    console.log(formData.get("title"))
 
    try{
        const update= {title: formData.get("title"),description:formData.get("description"),
            images:formData.getAll("images"),price:formData.get("price")
            ,categories:formData.getAll("cateSelect")}
        const item = await game.findOneAndUpdate({_id:id},update)
    
        return NextResponse.json({message:item},{status:200})

    }
    catch (err:any){
        
        const mess = "ERROR! " + err.message
        return NextResponse.json({message:mess},{status:404})
    }
    
}



export async function DELETE(req:Request, {params}:any) {
    const {id} = params

    try{
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const item = await game.findOneAndDelete({_id:id})
        console.log(item)
        return NextResponse.json({message:item},{status:200})
    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
}