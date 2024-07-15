import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import player from "@/models/player";
import game from "@/models/game";


export async function GET(req:NextRequest,{params:{slug}}:any) {
    try{
        if(!mongoose.connection.readyState){
        await ConnectDB()
        }
        console.log(slug)
        const query = {$or:[{userName:{$regex: slug, $options: 'i'}},{fullName:{$regex: slug, $options: 'i'}}]}
        const gameQuery = {$or:[{title:{$regex: slug, $options: 'i'}},{description:{$regex: slug, $options: 'i'}}]}
        const users = await player.find(query).select("userName fullName avatar")
        const games = await game.find(gameQuery).select("title description price images")
        if (users.length + games.length === 0){
            return NextResponse.json({message:'not-found'},{status:404})
        }


        return NextResponse.json({games,users})

    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}