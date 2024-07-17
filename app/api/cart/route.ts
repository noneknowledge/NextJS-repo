import { checkToken } from "@/libs/helper";
import player from "@/models/player";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest) {
    try{
        
        const token = req.cookies.get("token")?.value as string
        
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const decode = checkToken(token)
        const {id} = decode
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