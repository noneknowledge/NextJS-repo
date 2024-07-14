import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import player from "@/models/player";
import { hashPassWord } from "@/libs/helper/hash";


export async function POST (req:NextRequest){
    const formData = await req.formData();
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const newUser = new player()
    const passWord = formData.get("password") as string
    const hash = await hashPassWord(passWord)

    newUser.userName = formData.get("username")
    newUser.passWord = hash
    newUser.email = formData.get("email")

   
    console.log(hash)
    await newUser.save()
    return NextResponse.json(newUser)
}