import ConnectDB from "@/libs/db_config";
import { checkToken } from "@/libs/helper";
import player from "@/models/player";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest) {
    try{
        
        const token = req.cookies.get("token")?.value as string
        
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const decode = checkToken(token)
        const {id} = decode
        
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const user = await player.findById(id).select("_id").populate("wishList","images title price")
        const {wishList} = user

        return NextResponse.json(wishList,{status:201})
    }

    catch(e:any){

        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
}



export async function PATCH(req:NextRequest){
    try{
        const token = req.cookies.get("token")?.value as string
        
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const {cart} = await req.json()
        const gameList = cart.map((x:ICart)=>x.gameid)
        
        const decode = checkToken(token)
        const {id} = decode
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        
        const user = await player.findById(id).select("_id wishList")
        
        user.wishList = user.wishList.filter((gameid:any)=> !gameList.includes(gameid.toString()))
        const {wishList} = user
        await user.save() 
        return NextResponse.json({message:"Updated",wishList,cart},{status:200})
    }
    catch(e:any){
        if(e.message.includes("jwt"))
            return NextResponse.json(e.message,{status:401})
        return NextResponse.json(e.message,{status:400})
    }
}

