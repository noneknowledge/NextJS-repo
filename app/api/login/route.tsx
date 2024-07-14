import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import player from "@/models/player";
import { checkPassWord } from "@/libs/helper/hash";
import { signToken,checkToken } from "@/libs/helper/verifyToken";




export async function GET (req:NextRequest){
   
    const token = req.cookies.get("token")?.value as string
    
    if(token === null || token === undefined){
        return NextResponse.json("Unauthorized",{status:401})
    }
    try{
        const decode = checkToken(token)
       
        const message = {JWT_decode:decode, message:"Decode cua jwt"}
    
        return NextResponse.json({message: message },{status:200})
    }
    catch (err:any){
        if(err.message === "jwt expired"){
            const message =  err.message
            return NextResponse.json(message ,{status:401})
        }
        const message = "Error! " + err.message
        return NextResponse.json({message: message },{status:400})
    }
   
}

export async function POST(req:NextRequest) {
    
    try{
        const formData = await req.formData();

        if(!mongoose.connection.readyState){
            await ConnectDB()
        }
        const userName = formData.get("username") as string
        const passWord = formData.get("password") as string
        const loginUser:any = await player.findOne({userName:userName})
        if(!loginUser){
            return NextResponse.json({message:"User not found"},{status:400})
        }
        else{
            const result = await checkPassWord(passWord,loginUser.passWord)
            if(result){
                //Asign JWT here 
                const token = signToken({userName:loginUser.userName,id:loginUser._id})
                const response = NextResponse.json({token:token,username:loginUser.userName,id:loginUser._id,avatar:loginUser.avatar},{status:200})
                response.cookies.set("token",token)
                return response

            }
            else{
                return NextResponse.json({message:"login fail"},{status:400})
            }
        }
    }
    catch(err:any){
        const mess = "Login failed: " + err.message
        return NextResponse.json({message:mess},{status:400})
    }
   


    
    
}