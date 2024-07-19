import { NextRequest, NextResponse } from "next/server"
import game from "@/models/game"
import player from "@/models/player"
import mongoose from "mongoose"
import ConnectDB from "@/libs/db_config"
import { checkToken } from "@/libs/helper"


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

export async function PATCH(req:NextRequest,{params}:any) {
    const {id} = params
    const token = req.cookies.get("token")?.value as string
    if(token === null){
        return NextResponse.json("Unauthorized",{status:401})
    }
    try{
        const decode = checkToken(token)
        const userId = decode.id 
        const item = await player.findOne({_id:userId},)
   
    
        if (item.wishList.includes(id))
        {
            var temp = []
            
            temp = item.wishList.filter((x:any) => x.toString() !== id)
            item.wishList = temp
        }
        else{
            item.wishList.push(id)
        }
     
        

        await item.save()
        

        const message = {text: "Update favorite game success",count:item.wishList.length}
        return NextResponse.json(message)

    }   
    catch(e:any){
        
        if(e.message.includes("jwt"))
            return NextResponse.json({message:e.message},{status:401})
        return NextResponse.json({message: e.message},{status:400})
    }
        
        
    
    
}

export async function DELETE(req:Request, {params}:any) {
    const {id} = params

    try{
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const item = await game.findOneAndDelete({_id:id})
       
        return NextResponse.json({message:item},{status:200})
    }
    catch (err){
        const mess = "Game not found."
        return NextResponse.json({message:mess},{status:404})
    }
}