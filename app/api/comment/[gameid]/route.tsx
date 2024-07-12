import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import comment from "@/models/comment";
import ConnectDB from "@/libs/db_config";
import { checkToken } from "@/libs/helper/verifyToken";


//Route GET: /comment/[gameid]
// DELETE /comment/[commentid]


export async function  GET(req:NextRequest,{params: {gameid}}:any) {
  

    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const comments = await comment.find({gameId:gameid}).populate("userId","_id avatar userName").populate("reply.userId","_id avatar userName")

    return NextResponse.json(comments)
}

export async function DELETE(req:NextRequest,{params: {gameid}}:any) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const token = req.cookies.get("token")?.value as string
    
    if(token === null || token === undefined){
        return NextResponse.json("Unauthorized",{status:401})
    }

    try{
        const decode = checkToken(token) 
        const {id} = decode
        
        const deleted = await comment.findOneAndDelete({_id:gameid,userId:id})
        if(deleted){
            return NextResponse.json({message:"delete request",deleted})
        }
        return NextResponse.json({message:"No content",deleted})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
   
}

export async function POST(req:NextRequest,{params: {gameid}}:any) {
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const token = req.cookies.get("token")?.value as string
    
    if(token === null || token === undefined){
        return NextResponse.json("Unauthorized",{status:401})
    }
    
    try{
        const decode = checkToken(token)
        const formData = await req.formData();
        const replyText = formData.get("replyarea")
        const reply = {userId:decode.id,content:replyText}
       
        const updater = {$push :{reply: reply}}
        await comment.updateOne({_id: gameid},updater)

        return NextResponse.json("updated",{status:201})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
   
}
